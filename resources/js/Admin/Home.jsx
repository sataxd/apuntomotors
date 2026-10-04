import { useState, useEffect, useRef } from "react"
import DateRangePicker from "../components/Adminto/form/DateRangePicker"
import { createRoot } from "react-dom/client"
import CreateReactScript from "../Utils/CreateReactScript"
import BaseAdminto from "../Components/Adminto/Base"
import Chart from "react-apexcharts"

// Utility function to ensure chart renders properly
const useChartInitialization = (chartId, dependencies = []) => {
  const chartRef = useRef(null)

  // When chart is mounted or dependencies change, make sure ApexCharts is initialized correctly
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Window.ApexCharts is available when react-apexcharts is loaded
      if (chartRef.current && window.ApexCharts) {
        // Force chart update if it exists
        try {
          const chart = window.ApexCharts.getChartByID(chartId)
          if (chart) {
            chart.updateOptions({}, false, true, true)
          }
        } catch (e) {
          console.log(`Chart ${chartId} refresh error: ${e.message}`)
        }
      }
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [chartId, ...dependencies])

  // Clean up chart on unmount
  useEffect(() => {
    return () => {
      try {
        const chart = window.ApexCharts?.getChartByID(chartId)
        if (chart) {
          chart.destroy()
        }
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  }, [chartId])

  return chartRef
}

// Clean up all existing ApexCharts instances - ESTE ERA EL useEffect QUE FALTABA
const CleanUpApexCharts = () => {
  useEffect(() => {
    // This helps prevent "Element not found" errors
    // by cleaning up any orphaned chart instances
    if (window.ApexCharts && window.ApexCharts.charts) {
      window.ApexCharts.charts.forEach((chart) => {
        if (chart && chart.el) {
          try {
            chart.destroy()
          } catch (e) {
            // Ignore errors during cleanup
          }
        }
      })
    }
  }, [])
  return null
}

const Home = ({ session, ...props }) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Tu useEffect original sin cambios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/admin/home-data")
        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        setError("Error al cargar los datos del dashboard")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 300000)
    return () => clearInterval(interval)
  }, [])

  // Componente MetricCard mejorado con diseño moderno
  const MetricCard = ({ title, value, trend, icon, isCurrency = false, secondaryText, color }) => {
    // Permitir recibir un prop progress, si no, usar 0
    const colorStyles = {
      blue: {
        ring: "#4f46e5",
        accent: "#4f46e5",
        bgLight: "#eef2ff",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        shadow: "0 8px 32px rgba(79, 70, 229, 0.12)",
      },
      green: {
        ring: "#10b981",
        accent: "#059669",
        bgLight: "#ecfdf5",
        gradient: "linear-gradient(135deg, #48cc6c 0%, #059669 100%)",
        shadow: "0 8px 32px rgba(16, 185, 129, 0.12)",
      },
      yellow: {
        ring: "#f59e0b",
        accent: "#d97706",
        bgLight: "#fffbeb",
        gradient: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        shadow: "0 8px 32px rgba(245, 158, 11, 0.12)",
      },
      cyan: {
        ring: "#06b6d4",
        accent: "#0891b2",
        bgLight: "#ecfeff",
        gradient: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
        shadow: "0 8px 32px rgba(6, 182, 212, 0.12)",
      },
    }

    const colorSet = colorStyles[color || "blue"]
    // Determinar el progreso según el tipo de métrica
    let progress = 0;
    if (title === "Ventas Hoy") {
      // Ejemplo: meta diaria 1000 soles
      const goal = 1000;
      progress = value && goal ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    } else if (title === "Ventas del Mes") {
      // Ejemplo: meta mensual 20000 soles
      const goal = 20000;
      progress = value && goal ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    } else if (title === "Pedidos Hoy") {
      // Ejemplo: meta diaria 20 pedidos
      const goal = 20;
      progress = value && goal ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    } else if (title === "Pedidos del Mes") {
      // Ejemplo: meta mensual 400 pedidos
      const goal = 400;
      progress = value && goal ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    }

    return (
      <div className="col-xl-3 col-md-6">
        <div
          className="metric-card card border-0 h-auto position-relative overflow-hidden"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            boxShadow: colorSet.shadow,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Decorative background element */}
          <div
            className="position-absolute"
            style={{
              top: "-20px",
              right: "-20px",
              width: "100px",
              height: "100px",
              background: colorSet.gradient,
              borderRadius: "50%",
              opacity: "0.08",
              transform: "scale(0.8)",
              transition: "transform 0.4s ease",
            }}
          />

          <div className="card-body p-4 position-relative">
            <div className="d-flex align-items-center justify-content-between ">
              <div className="flex-grow-1">
                {/* Icon and Progress Circle */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="icon-container d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: colorSet.bgLight,
                      border: `2px solid ${colorSet.ring}20`,
                      boxShadow: `0 4px 16px ${colorSet.ring}15`,
                    }}
                  >
                    <i className={`${icon} fs-4`} style={{ color: colorSet.accent }}></i>
                  </div>

                  {/* Circular Progress */}
                  <div className="position-relative" style={{ width: "70px", height: "70px" }}>
                    <svg width="70" height="70" className="progress-ring">
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="6"
                        style={{ opacity: 0.3 }}
                      />
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke={colorSet.ring}
                        strokeWidth="6"
                        strokeDasharray={`${(progress * 188.4) / 100} 188.4`}
                        strokeLinecap="round"
                        transform="rotate(-90 35 35)"
                        style={{
                          transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: `drop-shadow(0 2px 4px ${colorSet.ring}40)`,
                        }}
                      />
                    </svg>
                    <div
                      className="position-absolute top-50 start-50 translate-middle text-center"
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: colorSet.accent,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {progress}%
                    </div>
                  </div>
                </div>

                {/* Value and Title */}
                <div className="mb-3">
                  <h3
                    className="metric-value mb-2 fw-bold"
                    style={{
                      fontSize: "2rem",
                      color: "#1f2937",
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: "1.2",
                    }}
                  >
                    {isCurrency ? `S/ ${Number(value).toLocaleString()}` : Number(value).toLocaleString()}
                  </h3>
                  <p
                    className="metric-title text-muted mb-0 fw-semibold"
                    style={{
                      fontSize: "0.95rem",
                      letterSpacing: "0.025em",
                    }}
                  >
                    {title}
                  </p>
                </div>

                {/* Trend Indicator */}
                {trend !== undefined && (
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span
                      className={`trend-badge badge d-flex align-items-center gap-1 px-3 py-2`}
                      style={{
                        backgroundColor: trend >= 0 ? "#dcfce7" : "#fef2f2",
                        color: trend >= 0 ? "#166534" : "#dc2626",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        borderRadius: "12px",
                        border: `1px solid ${trend >= 0 ? "#bbf7d0" : "#fecaca"}`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      <i
                        className={`fas ${trend >= 0 ? "fa-arrow-up" : "fa-arrow-down"}`}
                        style={{ fontSize: "11px" }}
                      ></i>
                      {Math.abs(trend)}%
                    </span>
                    <small className="text-muted fw-medium" style={{ fontSize: "0.8rem" }}>
                      Desde el mes pasado
                    </small>
                  </div>
                )}

                {secondaryText && (
                  <small className="text-muted d-block mt-2 fw-medium" style={{ fontSize: "0.8rem" }}>
                    {secondaryText}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // GRÁFICA DE VENTAS MEJORADA - Tu funcionalidad completa
  const [range, setRange] = useState({
    startDate: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  })
  const [customSales, setCustomSales] = useState([])
  const [loadingCustom, setLoadingCustom] = useState(false)
  const [errorCustom, setErrorCustom] = useState("")

  useEffect(() => {
    setLoadingCustom(true)
    setErrorCustom("")
    fetch(`/admin/sales-by-range?start_date=${range.startDate}&end_date=${range.endDate}`)
      .then((r) => r.json())
      .then((data) => {
        setCustomSales(Array.isArray(data) ? data : [])
        setLoadingCustom(false)
      })
      .catch(() => {
        setErrorCustom("Error al cargar ventas por rango")
        setLoadingCustom(false)
      })
  }, [range])

  const CustomSalesChart = () => {
    const chartRef = useChartInitialization("custom-sales-chart", [customSales])

    const hasData = Array.isArray(customSales) && customSales.length > 0

    const xCategories = hasData
      ? customSales.map((d) => {
        const date = new Date(d.date)
        return date.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit" })
      })
      : []

    const options = {
      chart: {
        type: "bar",
        height: 400,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
          },
        },
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        background: "transparent",
        id: "custom-sales-chart",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
        },
      },
      colors: ["#4f46e5", "#10b981"],
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "45%",
        },
      },
      xaxis: {
        categories: xCategories,
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: '"Inter", sans-serif',
            colors: "#6b7280",
            fontWeight: "500",
          },
          rotate: 0,
          trim: false,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: [
        {
          title: {
            text: "Pedidos",
            style: { fontSize: "13px", fontWeight: 600, color: "#4f46e5" },
          },
          min: 0,
          labels: {
            style: { fontSize: "12px", colors: "#6b7280", fontWeight: "500" },
            formatter: (val) => Math.round(val),
          },
        },
        {
          opposite: true,
          title: {
            text: "Monto (S/)",
            style: { fontSize: "13px", fontWeight: 600, color: "#10b981" },
          },
          min: 0,
          labels: {
            style: { fontSize: "12px", colors: "#6b7280", fontWeight: "500" },
            formatter: (val) => `S/ ${Math.round(val)}`,
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontSize: "12px",
          fontFamily: '"Inter", sans-serif',
        },
        y: [
          { formatter: (val) => `${val} pedidos` },
          { formatter: (val) => `S/ ${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        ],
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetY: -10,
        fontSize: "13px",
        fontFamily: '"Inter", sans-serif',
        fontWeight: "500",
        markers: { width: 10, height: 10, radius: 20 },
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "#f3f4f6",
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      states: {
        hover: { filter: { type: "lighten", value: 0.04 } },
        active: { filter: { type: "darken", value: 0.08 } },
      },
    }

    const series = hasData
      ? [
        {
          name: "Pedidos",
          type: "bar",
          data: customSales.map((d) => d.order_count),
          color: "#4f46e5",
        },
        {
          name: "Ventas",
          type: "bar",
          data: customSales.map((d) => d.total_sales),
          color: "#10b981",
        },
      ]
      : []

    const totalSales = hasData
      ? customSales
        .reduce((total, item) => total + item.total_sales, 0)
        .toLocaleString(undefined, { maximumFractionDigits: 2 })
      : "0.00"

    const totalOrders = hasData ? customSales.reduce((total, item) => total + item.order_count, 0) : 0

    return (
      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
        <div className="card-header bg-transparent d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-0 pb-0 pt-4">
          <div>
            <h5 className="mb-2 fw-bold" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
              Estadísticas de Ventas
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Análisis diario de pedidos y ventas
            </p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <DateRangePicker {...range} onChange={setRange} />
            <button
              className="btn btn-light btn-sm border-0 shadow-sm"
              title="Refrescar"
              style={{ borderRadius: "12px", padding: "8px 12px" }}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        <div className="card-body pt-3">
          {loadingCustom ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "350px" }}>
              <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
            </div>
          ) : errorCustom ? (
            <div className="alert alert-danger border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              {errorCustom}
            </div>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div
                    className="summary-card p-4 text-center h-100"
                    style={{
                      background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                      borderRadius: "16px",
                      border: "1px solid #c7d2fe",
                      boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08)",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div
                        className="icon-wrapper me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "#4f46e5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-dollar-sign text-white" style={{ fontSize: "14px" }}></i>
                      </div>
                      <p className="text-muted mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                        Total Ventas
                      </p>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: "#4f46e5", fontSize: "1.8rem" }}>
                      S/ {totalSales}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="summary-card p-4 text-center h-100"
                    style={{
                      background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                      borderRadius: "16px",
                      border: "1px solid #a7f3d0",
                      boxShadow: "0 4px 16px rgba(16, 185, 129, 0.08)",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div
                        className="icon-wrapper me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="fas fa-shopping-cart text-white" style={{ fontSize: "14px" }}></i>
                      </div>
                      <p className="text-muted mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                        Total Pedidos
                      </p>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: "#10b981", fontSize: "1.8rem" }}>
                      {totalOrders}
                    </h4>
                  </div>
                </div>
              </div>
              <div id="custom-sales-chart-container" ref={chartRef}>
                {hasData && (
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={400}
                    key={`sales-chart-${customSales.length}`}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // TopProducts mejorado manteniendo funcionalidad
  const TopProducts = ({ products }) => (
  <div className="col-xl-4">
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
      <div className="card-header bg-transparent d-flex justify-content-between align-items-center border-0 pb-0 pt-4">
        <div>
          <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
            Top Productos
          </h5>
          <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
            Los productos más vendidos
          </p>
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="products-list">
          {products?.slice(0, 5).map((product, index) => (
            <div
              key={product.id + '-' + (product.color_name || '') + '-' + (product.zise_name || '')}
              className="product-item d-flex align-items-center p-3 mb-3 position-relative"
              style={{
                background: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {/* Ranking Badge */}
              <div
                className="ranking-badge position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                      : index === 1
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  fontSize: "12px",
                  top: "-8px",
                  left: "-8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                {index + 1}
              </div>

              <div className="flex-shrink-0 me-3">
                <div
                  className="product-image-wrapper"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    border: "2px solid #ffffff",
                  }}
                >
                  <img
                    src={`/api/items/media/${product.image}`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      backgroundColor: "#f5f5f5",
                      transition: "transform 0.3s ease",
                    }}
                    onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
              </div>

              <div className="flex-grow-1 min-w-0">
                <h6
                  className="mb-1 fw-bold text-truncate"
                  style={{ maxWidth: "140px", color: "#1f2937", fontSize: "0.95rem" }}
                >
                  {product.name}
                </h6>
                <span className="text-muted fw-medium" style={{ fontSize: "0.8rem" }}>
                  {product.sku}
                </span>
                {(product.color_name || product.zise_name) && (
                  <div className="text-muted fw-medium mt-1" style={{ fontSize: "0.8rem" }}>
                    {product.color_name && (
                      <span>Color: {product.color_name} </span>
                    )}
                    {product.zise_name && (
                      <span>Talla: {product.zise_name}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="text-end">
                <span
                  className="sales-badge badge mb-2 px-3 py-1"
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                    color: "#1e40af",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    borderRadius: "12px",
                    border: "1px solid #93c5fd",
                  }}
                >
                  {product.total_sold}
                </span>
                <div className="fw-bold" style={{ color: "#059669", fontSize: "0.9rem" }}>
                  S/ {Number(product.total_revenue).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ))}
        </div>
        {products?.length > 5 && (
          <div className="text-center mt-4">
            <a
              href="/admin/items"
              className="btn btn-link text-decoration-none fw-semibold d-flex align-items-center justify-content-center mx-auto"
              style={{ color: "#4f46e5", fontSize: "0.9rem" }}
            >
              Ver todos los productos
              <i className="fas fa-chevron-right ms-2" style={{ fontSize: "12px" }}></i>
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
  )

  // TopProvincesChart mejorado
  const TopProvincesChart = ({ data }) => {
    const chartRef = useChartInitialization("top-provinces-chart", [data])
    const hasData = Array.isArray(data) && data.length > 0

    const options = {
      chart: {
        type: "bar",
        height: 320,
        toolbar: { show: false },
        fontFamily: '"Inter", sans-serif',
        id: "top-provinces-chart",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
          barHeight: "65%",
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: hasData ? data.map((item) => item.province) : [],
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: '"Inter", sans-serif',
            colors: "#6b7280",
            fontWeight: "500",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
      },
      colors: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"],
      legend: { show: false },
      grid: {
        strokeDashArray: 3,
        borderColor: "#f3f4f6",
      },
      tooltip: {
        y: {
          formatter: (val) => `S/ ${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        },
      },
    }

    const series = hasData
      ? [
        {
          name: "Ventas",
          data: data.map((item) => item.total_sales),
        },
      ]
      : []

    return (
      <div className="col-xl-6">
        <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
          <div className="card-header bg-transparent d-flex justify-content-between align-items-center border-0 pb-0 pt-4">
            <div>
              <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
                Top Provincias
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                Ventas por región
              </p>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-light btn-sm border-0 shadow-sm dropdown-toggle"
                type="button"
                style={{ borderRadius: "12px", padding: "8px 16px" }}
              >
                <span className="me-1">Mensual</span>
              </button>
            </div>
          </div>
          <div className="card-body pt-3">
            <div id="top-provinces-chart-container" ref={chartRef}>
              {hasData && (
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  height={320}
                  key={`provinces-chart-${data.length}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // TrafficSourcesChart mejorado
  const TrafficSourcesChart = ({ data }) => {
    const chartRef = useChartInitialization("traffic-sources-chart", [data])
    const hasData = Array.isArray(data) && data.length > 0

    const options = {
      chart: {
        type: "donut",
        id: "traffic-sources-chart",
        fontFamily: '"Inter", sans-serif',
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      labels: hasData ? data.map((item) => item.source_group) : [],
      colors: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"],
      legend: {
        position: "bottom",
        fontSize: "13px",
        fontFamily: '"Inter", sans-serif',
        fontWeight: "500",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                fontSize: "16px",
                fontWeight: "600",
                color: "#1f2937",
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: { chart: { width: 200 } },
        },
      ],
    }

    const series = hasData ? data.map((item) => item.visits) : []

    return (
      <div className="col-xl-6">
        <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
          <div className="card-header bg-transparent border-0 pb-0 pt-4">
            <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
              Fuentes de Tráfico
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Distribución de visitantes
            </p>
          </div>
          <div className="card-body pt-3">
            <div id="traffic-sources-chart-container" ref={chartRef}>
              {hasData && (
                <Chart
                  options={options}
                  series={series}
                  type="donut"
                  height={320}
                  key={`traffic-chart-${data.length}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // SocialMediaTrafficChart mejorado - COMPLETO
  const SocialMediaTrafficChart = ({ data }) => {
    const chartRef = useChartInitialization("social-media-chart", [data])
    const hasData = Array.isArray(data) && data.length > 0

    const categories = hasData
      ? data.map((item) => {
        const socialName = item.source.charAt(0).toUpperCase() + item.source.slice(1)
        return `${socialName} (${item.visits})`
      })
      : []

    const series = hasData
      ? [
        {
          name: "Móviles",
          data: data.map((item) => item.mobile_visits),
          color: "#4f46e5",
        },
        {
          name: "Escritorio",
          data: data.map((item) => item.desktop_visits),
          color: "#10b981",
        },
      ]
      : []

    const options = {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: { show: false },
        id: "social-media-chart",
        fontFamily: '"Inter", sans-serif',
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 8,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "500",
            colors: "#6b7280",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: {
          text: "Visitas",
          style: {
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "500",
            colors: "#6b7280",
          },
        },
      },
      fill: { opacity: 0.9 },
      tooltip: {
        y: {
          formatter: (val) => `${val} visitas`,
          title: {
            formatter: (seriesName) => `${seriesName}:`,
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        fontSize: "13px",
        fontWeight: "500",
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "#f3f4f6",
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: { height: 400 },
            plotOptions: { bar: { columnWidth: "70%" } },
          },
        },
      ],
    }

    return (
      <div className="col-xl-12">
        <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
          <div className="card-header bg-transparent border-0 pb-0 pt-4">
            <h5 className="fw-bold mb-2 d-flex align-items-center" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
              <i className="fas fa-hashtag me-3 text-primary"></i>
              Tráfico de Redes Sociales
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Análisis de tráfico por dispositivo y plataforma
            </p>
          </div>
          <div className="card-body pt-3">
            <div id="social-media-chart-container" ref={chartRef}>
              {hasData && (
                <Chart options={options} series={series} type="bar" height={350} key={`social-chart-${data.length}`} />
              )}
            </div>

            {hasData && (
              <div className="row mt-4 text-center">
                {data.map((item, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div
                      className="social-stat-card p-4 h-100"
                      style={{
                        background: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)",
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <i
                          className={`fa-brands fab fa-${item.source} me-3`}
                          style={{
                            fontSize: "2rem",
                            color: index === 0 ? "#4f46e5" : index === 1 ? "#10b981" : "#f59e0b",
                          }}
                        ></i>
                        <div>
                          <div className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>
                            Total Visitas
                          </div>
                          <div className="h4 mb-0 fw-bold" style={{ color: "#1f2937" }}>
                            {item.visits}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="text-center">
                          <div className="fw-semibold" style={{ color: "#4f46e5" }}>
                            {item.mobile_visits}
                          </div>
                          <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                            Móviles
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="fw-semibold" style={{ color: "#10b981" }}>
                            {item.desktop_visits}
                          </div>
                          <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                            Escritorio
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="text-muted">Cargando dashboard...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="alert alert-danger m-4 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="d-flex align-items-center">
          <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
          <div>
            <h6 className="mb-1">Error al cargar el dashboard</h6>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    )

  return (
    <div className="modern-dashboard">
      <CleanUpApexCharts />
      <style jsx="true">{`
      
        
        .metric-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
        }
        
        .metric-card:hover .position-absolute {
          transform: scale(1.1);
        }
        
        .progress-ring {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        
        .icon-container {
          transition: all 0.3s ease;
        }
        
        .metric-card:hover .icon-container {
          transform: scale(1.05);
        }
        
        .trend-badge {
          transition: all 0.2s ease;
        }
        
        .trend-badge:hover {
          transform: scale(1.05);
        }
        
        .summary-card {
          transition: all 0.3s ease;
        }
        
        .summary-card:hover {
          transform: translateY(-2px);
        }
        
        .product-item:hover .ranking-badge {
          transform: scale(1.1);
        }
        
        .social-stat-card {
          transition: all 0.3s ease;
        }
        
        .social-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        .card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .btn {
          transition: all 0.2s ease;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="container-fluid ">
        {/* Header mejorado */}
        <div className="row mb-4 align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-3">
              <div
                className="header-icon d-flex align-items-center justify-content-center me-4"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 8px 32px rgba(79, 70, 229, 0.3)",
                }}
              >
                <i className="fas fa-tachometer-alt text-white" style={{ fontSize: "1.5rem" }}></i>
              </div>
              <div>
                <h1 className="h2 mb-1 fw-bold text-gradient">  Bienvenido de vuelta, <span className="fw-semibold">{session.name}</span></h1>


              </div>
            </div>
            <div className="d-flex align-items-center text-muted" style={{ fontSize: "0.9rem" }}>
              <i className="far fa-calendar-alt me-2"></i>
              <span className="fw-medium">
                Actualizado:{" "}
                {new Date().toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

        </div>

        {/* Métricas principales */}
        <div className="row g-4 ">
          <MetricCard
            title="Ventas Hoy"
            value={dashboardData.kpis?.sales_today}
            icon="fas fa-bolt"
            isCurrency
            color="blue"
            secondaryText="Ventas realizadas hoy"
          />
          <MetricCard
            title="Ventas del Mes"
            value={dashboardData.kpis?.sales_month}
            icon="fas fa-calendar-alt"
            isCurrency
            color="green"
            secondaryText="Ventas acumuladas este mes"
          />
          <MetricCard
            title="Pedidos Hoy"
            value={dashboardData.kpis?.orders_today}
            icon="fas fa-shopping-cart"
            color="yellow"
            secondaryText="Pedidos realizados hoy"
          />
          <MetricCard
            title="Pedidos del Mes"
            value={dashboardData.kpis?.orders_month}
            icon="fas fa-clipboard-list"
            color="cyan"
            secondaryText="Pedidos acumulados este mes"
          />
        </div>

        {/* Gráfica principal y top productos */}
        <div className="row g-4 mb-5">
          <div className="col-xl-8">
            <CustomSalesChart />
          </div>
          <TopProducts products={dashboardData.top_products} />
        </div>

        {/* Provincias y fuentes de tráfico */}
        <div className="row g-4 mb-5">
          <TopProvincesChart data={dashboardData.top_provinces} />
          <TrafficSourcesChart data={dashboardData.traffic_sources} />
        </div>

        {/* Estado de pedidos y redes sociales */}
        <div className="row g-4 mb-5">
          <div className="col-xl-5">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
              <div className="card-header bg-transparent border-0 pb-0 pt-4">
                <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
                  Estado de Pedidos
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  Distribución por estado
                </p>
              </div>
              <div className="card-body pt-3">
                {dashboardData.ordersByStatus && dashboardData.ordersByStatus.length > 0 && (
                  <Chart
                    options={{
                      chart: {
                        id: "order-status-chart",
                        fontFamily: '"Inter", sans-serif',
                        animations: {
                          enabled: true,
                          easing: "easeinout",
                          speed: 800,
                        },
                      },
                      labels: dashboardData.ordersByStatus.map((s) => s.name),
                      colors: dashboardData.ordersByStatus.map((s) => s.color),
                      legend: {
                        position: "bottom",
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                          },
                        },
                      },
                    }}
                    series={dashboardData.ordersByStatus.map((s) => s.count)}
                    type="donut"
                    height={320}
                    key={`order-chart-${dashboardData.ordersByStatus.length}`}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <SocialMediaTrafficChart data={dashboardData.social_media_traffic} />
          </div>
        </div>

        {/* Ventas recientes e inventario bajo */}
        <div className="row g-4 mb-5">
          <div className="col-xl-6">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
              <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pb-0 pt-4">
                <div>
                  <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
                    Ventas Recientes
                  </h5>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                    Últimas transacciones
                  </p>
                </div>
                <a href="/admin/sales" className="btn btn-primary btn-sm shadow-sm" style={{ borderRadius: "12px" }}>
                  Ver todo
                </a>
              </div>
              <div className="card-body pt-3">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                        <th className="fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
                          Código
                        </th>
                        <th className="fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
                          Cliente
                        </th>
                        <th className="fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
                          Total
                        </th>
                        <th className="fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recent_orders?.map((order) => (
                        <tr key={order.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                          <td className="fw-semibold" style={{ color: "#4f46e5" }}>
                            #{order.code}
                          </td>
                          <td className="fw-medium">{order.customer_name}</td>
                          <td className="fw-bold" style={{ color: "#059669" }}>
                            S/ {order.total}
                          </td>
                          <td>
                            <span
                              className="badge px-3 py-2 fw-medium"
                              style={{
                                backgroundColor: order.status.color,
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                              }}
                            >
                              {order.status.name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
              <div className="card-header bg-transparent d-flex justify-content-between align-items-center border-0 pb-0 pt-4">
                <div>
                  <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#ef4444" }}>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Inventario Bajo
                  </h5>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                    Productos con stock mínimo
                  </p>
                </div>
                <span className="badge bg-danger fw-bold" style={{ fontSize: "0.9rem", borderRadius: "12px" }}>
                  {dashboardData.low_stock?.length || 0}
                </span>
              </div>
              <div className="card-body pt-3">
                <div className="products-list">
                  {dashboardData.low_stock?.slice(0, 5).map((product, index) => (
                    <div
                      key={product.id}
                      className="product-item d-flex align-items-center p-3 mb-3 position-relative"
                      style={{
                        background: "linear-gradient(145deg, #fef2f2 0%, #fee2e2 100%)",
                        borderRadius: "16px",
                        border: "1px solid #fecaca",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(239,68,68,0.12)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      {/* Ranking Badge */}
                      <div
                        className="ranking-badge position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background:
                            index === 0
                              ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                              : index === 1
                                ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                                : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          fontSize: "12px",
                          top: "-8px",
                          left: "-8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          zIndex: 10,
                        }}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-shrink-0 me-3">
                        <div
                          className="product-image-wrapper"
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            border: "2px solid #ffffff",
                          }}
                        >
                          <img
                            src={`/api/items/media/${product.image}`}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              backgroundColor: "#f5f5f5",
                              transition: "transform 0.3s ease",
                            }}
                            onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                          />
                        </div>
                      </div>

                      <div className="flex-grow-1 min-w-0">
                        <h6
                          className="mb-1 fw-bold text-truncate"
                          style={{ maxWidth: "140px", color: "#1f2937", fontSize: "0.95rem" }}
                        >
                          {product.name}
                        </h6>
                        <span className="text-muted fw-medium" style={{ fontSize: "0.8rem" }}>
                          SKU: {product.sku}
                        </span>
                        {(product.color_name || product.zise_name) && (
                          <div className="text-muted fw-medium mt-1" style={{ fontSize: "0.8rem" }}>
                            {product.color_name && (
                              <span style={{ display: 'inline-block', marginRight: 6 }}>
                                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#eee', border: '1px solid #ccc', marginRight: 4, verticalAlign: 'middle', backgroundColor: product.color_summary || '#eee' }}></span>
                                Color: {product.color_name}
                              </span>
                            )}
                            {product.zise_name && (
                              <span style={{ marginLeft: 6 }}>Talla: {product.zise_name}</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-end">
                        <span
                          className="sales-badge badge mb-2 px-3 py-1"
                          style={{
                            background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                            color: "#dc2626",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            borderRadius: "12px",
                            border: "1px solid #fecaca",
                          }}
                        >
                          {product.stock} unidades
                        </span>
                        <div className="fw-bold" style={{ color: "#ef4444", fontSize: "0.9rem" }}>
                          S/ {Number(product.price ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {dashboardData.low_stock?.length > 5 && (
                  <div className="text-center mt-4">
                    <a
                      href="/admin/items"
                      className="btn btn-link text-decoration-none fw-semibold d-flex align-items-center justify-content-center mx-auto"
                      style={{ color: "#ef4444", fontSize: "0.9rem" }}
                    >
                      Ver todos los productos
                      <i className="fas fa-chevron-right ms-2" style={{ fontSize: "12px" }}></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tráfico y conversión por dispositivo */}
        <div className="row g-4 mb-5">
          <div className="col-xl-6">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
              <div className="card-header bg-transparent border-0 pb-0 pt-4">
                <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
                  Tráfico por Dispositivo
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  Distribución de visitantes
                </p>
              </div>
              <div className="card-body pt-3">
                {dashboardData.traffic_stats?.by_device && dashboardData.traffic_stats.by_device.length > 0 && (
                  <Chart
                    options={{
                      chart: {
                        id: "traffic-device-chart",
                        fontFamily: '"Inter", sans-serif',
                        animations: {
                          enabled: true,
                          easing: "easeinout",
                          speed: 800,
                        },
                      },
                      labels: dashboardData.traffic_stats.by_device.map((d) => d.device),
                      colors: ["#4f46e5", "#10b981", "#f59e0b"],
                      legend: {
                        position: "bottom",
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                          },
                        },
                      },
                    }}
                    series={dashboardData.traffic_stats.by_device.map((d) => d.visits)}
                    type="donut"
                    height={320}
                    key={`traffic-device-chart-${dashboardData.traffic_stats.by_device.length}`}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "20px" }}>
              <div className="card-header bg-transparent border-0 pb-0 pt-4">
                <h5 className="fw-bold mb-2" style={{ fontSize: "1.4rem", color: "#1f2937" }}>
                  Conversión por Dispositivo
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  Tasa de conversión
                </p>
              </div>
              <div className="card-body pt-3">
                {dashboardData.conversion_stats?.by_device && dashboardData.conversion_stats.by_device.length > 0 && (
                  <Chart
                    options={{
                      chart: {
                        type: "bar",
                        id: "conversion-device-chart",
                        fontFamily: '"Inter", sans-serif',
                        toolbar: { show: false },
                        animations: {
                          enabled: true,
                          easing: "easeinout",
                          speed: 800,
                        },
                      },
                      xaxis: {
                        categories: dashboardData.conversion_stats.by_device.map((d) => d.device),
                        labels: {
                          style: {
                            fontSize: "12px",
                            fontWeight: "500",
                            colors: "#6b7280",
                          },
                        },
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                      },
                      yaxis: {
                        labels: {
                          style: {
                            fontSize: "12px",
                            fontWeight: "500",
                            colors: "#6b7280",
                          },
                        },
                      },
                      colors: ["#4f46e5"],
                      plotOptions: {
                        bar: {
                          borderRadius: 8,
                          columnWidth: "60%",
                        },
                      },
                      grid: {
                        strokeDashArray: 3,
                        borderColor: "#f3f4f6",
                      },
                      dataLabels: { enabled: false },
                      tooltip: {
                        y: {
                          formatter: (val) => `${val}%`,
                        },
                      },
                    }}
                    series={[
                      {
                        name: "Tasa de Conversión",
                        data: dashboardData.conversion_stats.by_device.map((d) => d.conversion_rate),
                      },
                    ]}
                    type="bar"
                    height={320}
                    key={`conversion-chart-${dashboardData.conversion_stats.by_device.length}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <BaseAdminto {...properties} title="Dashboard - Admin">
      <Home {...properties} />
    </BaseAdminto>,
  )
})
