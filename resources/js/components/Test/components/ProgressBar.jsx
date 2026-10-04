import React from "react"

const ProgressBar = ({ className = 'max-w-md', width, color = '#F7C2C6' }) => {
  return <div className={`h-2 bg-[#EFEAE5] ${className} rounded-full mx-auto`}>
    <hr className={`h-full rounded-full`} style={{
      backgroundColor: color,
      width: width,
      transition: 'all .25s'
    }} />
  </div>
}

export default ProgressBar