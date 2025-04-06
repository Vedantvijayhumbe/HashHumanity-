"use client"

import { useState, useEffect } from "react"
import { RefreshCw, ArrowRight } from "lucide-react"
import "./CurrencyConverter.css"

const CURRENCIES = [
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
    { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
    { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
]

const CurrencyConverter = () => {
    const [ethAmount, setEthAmount] = useState(1)
    const [ethPrice, setEthPrice] = useState(null)
    const [exchangeRates, setExchangeRates] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)

    const fetchRates = async () => {
        setLoading(true)
        setError(null)

        try {
        // 1. ETH to USD
        const ethResponse = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        if (!ethResponse.ok) throw new Error("Failed to fetch ETH price")
        const ethData = await ethResponse.json()
        const ethUsdPrice = ethData?.ethereum?.usd
        if (!ethUsdPrice) throw new Error("Invalid ETH price response")
        setEthPrice(ethUsdPrice)

        // 2. USD to other currencies - commented out
        /*
        const currencyCodes = CURRENCIES.map((c) => c.code).join(",")
        const myHeaders = new Headers()
        myHeaders.append("apikey", import.meta.env.VITE_EXCHANGE_RATE_API_KEY)

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        }

        const forexResponse = await fetch(
            `https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=${currencyCodes}`,
            requestOptions
        )

        const forexData = await forexResponse.json()
        console.log("forexData:", forexData)

        if (!forexData.success) {
            throw new Error(forexData.error?.info || "Failed to fetch exchange rates")
        }

        setExchangeRates(forexData.rates)
        */

        // fallback: setting all exchange rates to 1 (so ETH → USD only)
        setExchangeRates({ USD: 1 })

        setLastUpdated(new Date())
        } catch (err) {
        console.error("Error fetching rates:", err)
        setError(err.message || "Failed to fetch exchange rates")
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchRates()
        const interval = setInterval(fetchRates, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const handleAmountChange = (e) => {
        const value = e.target.value
        if (value === "" || !isNaN(value)) {
        setEthAmount(value === "" ? "" : parseFloat(value))
        }
    }

    const formatCurrency = (amount, code) => {
        if (amount === undefined || amount === null || isNaN(amount)) return "-"
        try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: code,
            maximumFractionDigits: 2,
        }).format(amount)
        } catch {
        return `${amount.toFixed(2)} ${code}`
        }
    }

    return (
        <section className="converter-section">
        <div className="converter-container">
            <h1 className="converter-title">Ethereum Currency Converter</h1>
            <p className="converter-description">
            Convert Ethereum (ETH) to major world currencies in real-time. Useful for refugees and aid workers to
            understand the value of digital assets in local currencies.
            </p>

            <div className="converter-card">
            <div className="converter-input-group">
                <div className="eth-input-container">
                <label htmlFor="eth-amount" className="input-label">
                    Ethereum (ETH) Amount
                </label>
                <div className="eth-input-wrapper">
                    <input
                    id="eth-amount"
                    type="text"
                    value={ethAmount}
                    onChange={handleAmountChange}
                    className="eth-input"
                    placeholder="Enter ETH amount"
                    />
                    <span className="eth-symbol">ETH</span>
                </div>
                </div>

                <button className="refresh-button" onClick={fetchRates} disabled={loading}>
                <RefreshCw size={20} className={loading ? "spinning" : ""} />
                <span className="sr-only">Refresh</span>
                </button>
            </div>

            {error ? (
                <div className="error-message">
                <p>{error}</p>
                <p>Please try again later or check your internet connection.</p>
                {ethPrice && <p className="mt-4">Showing last successfully loaded rates.</p>}
                </div>
            ) : loading && !ethPrice ? (
                <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading exchange rates...</p>
                </div>
            ) : (
                <>
                <div className="eth-usd-rate">
                    <p>
                    Current ETH Price: <strong>{formatCurrency(ethPrice, "USD")}</strong>
                    </p>
                    {lastUpdated && <p className="last-updated">Last updated: {lastUpdated.toLocaleTimeString()}</p>}
                </div>

                <div className="conversion-results">
                    <h2 className="results-title">Conversion Results</h2>
                    <div className="currency-grid">
                    {CURRENCIES.map((currency) => (
                        <div key={currency.code} className="currency-card">
                        <div className="currency-header">
                            <span className="currency-flag">{currency.flag}</span>
                            <span className="currency-name">{currency.name}</span>
                        </div>
                        <div className="conversion-formula">
                            <span className="eth-amount">{ethAmount || 0} ETH</span>
                            <ArrowRight size={16} className="arrow-icon" />
                            <span className="converted-amount">
                            {ethAmount && ethPrice && exchangeRates[currency.code]
                                ? formatCurrency(ethAmount * ethPrice * exchangeRates[currency.code], currency.code)
                                : "-"}
                            </span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </>
            )}
            </div>

            <div className="disclaimer">
            <p>
                <strong>Disclaimer:</strong> Exchange rates are for informational purposes. Data is sourced from CoinGecko
                and Apilayer APIs.
            </p>
            </div>
        </div>
        </section>
    )
}

export default CurrencyConverter
