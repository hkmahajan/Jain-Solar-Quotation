import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Sun, 
  FileText, 
  Calculator, 
  RefreshCcw, 
  CheckCircle, 
  Zap, 
  Shield, 
  PenTool, 
  Download, 
  Loader2,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

// Rate Tables (GST Included)
const COMMERCIAL_RATES = {
  2: 140000,
  3: 175000,
  4: 220000,
  5: 270000,
  6: 330000,
  7: 360000,
  8: 390000,
  9: 410000,
  10: 460000
};

const RESIDENTIAL_RATES = {
  2: { price: 160000, subsidy: 60000 },
  3: { price: 205000, subsidy: 78000 },
  4: { price: 260000, subsidy: 78000 },
  5: { price: 307000, subsidy: 78000 },
  6: { price: 383000, subsidy: 78000 },
  7: { price: 423000, subsidy: 78000 },
  8: { price: 463000, subsidy: 78000 },
  9: { price: 503000, subsidy: 78000 },
  10: { price: 553000, subsidy: 78000 }
};

// --- Sub-Components Moved Outside to Prevent Focus Loss ---

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '', width = 'w-full' }) => (
  <div className={`mb-4 ${width}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, width = 'w-full' }) => (
  <div className={`mb-4 ${width}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Header = ({ formData, showAddress = true }) => (
  <header className="border-b-4 border-orange-500 pb-3 mb-5 flex justify-between items-start">
    <div className="flex items-start gap-3">
      <div className="mt-1">
        <img 
          src="/logo.png" 
          alt="Jain Multiservices Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight leading-none">JAIN</h1>
        <h2 className="text-lg font-bold text-gray-800 tracking-widest uppercase">MULTISERVICE</h2>
        <p className="text-gray-500 text-[9px] font-bold mt-0.5 tracking-[0.25em] uppercase">SOLAR ENERGY SOLUTIONS</p>
        
        {showAddress && (
          <div className="mt-2 text-[10px] text-gray-600 space-y-0.5">
            <p className="flex items-center gap-1"><span className="font-semibold">GST No:</span> 27BGOPM2216B1ZO</p>
            <p className="flex items-center gap-1"><MapPin size={10}/> Shop No. 6, Ganesh Society in Front of Bus stand, Lonar</p>
            <p className="flex items-center gap-1"><Phone size={10}/> +91 99600 69017 <span className="text-gray-300 mx-1">|</span> <Mail size={10}/>jainmultiservices1@gmail.com</p>
          </div>
        )}
      </div>
    </div>
    <div className="text-right">
      <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded text-[10px] font-bold mb-1.5 tracking-wider">
        QUOTATION
      </div>
      <p className="text-gray-600 text-xs">Ref: <span className="font-mono font-bold text-gray-800">{formData.quoteRef}</span></p>
      <p className="text-gray-600 text-xs">Date: <span className="font-bold text-gray-800">{formData.date}</span></p>
    </div>
  </header>
);

const EditForm = ({ formData, handleChange, financials, setMode }) => (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border-t-4 border-orange-500">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-orange-500" /> Quote Builder
      </h2>
      <button 
        onClick={() => setMode('preview')}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-colors shadow-sm"
      >
        <FileText className="w-4 h-4" /> Preview & Download
      </button>
    </div>

    {/* Section 1: Customer Info */}
    <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Customer Details</h3>
      <div className="flex flex-wrap gap-4">
        <InputField label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} width="flex-1 min-w-[200px]" placeholder="Enter Customer Name" />
        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} width="flex-1 min-w-[200px]" placeholder="9876543210" />
        <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" width="w-40" />
      </div>
      <div className="flex flex-wrap gap-4">
        <InputField label="Site Address" name="address" value={formData.address} onChange={handleChange} width="flex-1" placeholder="Full Address" />
         <InputField label="Quote Ref" name="quoteRef" value={formData.quoteRef} onChange={handleChange} width="w-40" />
      </div>
    </div>

    {/* Section 2: System Specs */}
    <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">System Specifications</h3>
      
      <div className="flex flex-wrap gap-4 mb-2">
        <SelectField 
          label="Category" 
          name="category" 
          value={formData.category}
          onChange={handleChange}
          options={['Residential', 'Commercial']} 
          width="w-1/3"
        />
        <InputField 
          label="System Size (kW)" 
          name="systemSize" 
          value={formData.systemSize}
          onChange={handleChange}
          type="number" 
          width="w-1/3" 
        />
        <SelectField 
          label="Structure Type" 
          name="structureHeight" 
          value={formData.structureHeight}
          onChange={handleChange}
          options={['Standard (Low Height)', 'Elevated (High Rise)', 'Tin Shed Flush Mount', '3000mm Ground Clearance (With Walkway)']} 
          width="flex-1"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <InputField label="Panel Brand" name="panelBrand" value={formData.panelBrand} onChange={handleChange} width="flex-1" />
        <InputField label="Panel Wattage (Wp)" name="panelWattage" value={formData.panelWattage} onChange={handleChange} placeholder="e.g. 560-590" width="w-40" />
      </div>
      
      <div className="flex flex-wrap gap-4 mt-2">
        <InputField label="Inverter Brand" name="inverterBrand" value={formData.inverterBrand} onChange={handleChange} width="flex-1" />
        <InputField label="Inverter Capacity (kW)" name="inverterCapacity" value={formData.inverterCapacity} onChange={handleChange} placeholder="e.g. 3" width="w-32" type="number" />
        <SelectField 
          label="Inverter Type" 
          name="inverterType" 
          value={formData.inverterType}
          onChange={handleChange}
          options={['On-Grid', 'Hybrid', 'Off-Grid']} 
          width="w-48"
        />
      </div>
    </div>

    {/* Section 3: Pricing */}
    <div className="mb-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
      <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">Pricing (GST Included)</h3>
      
      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="useManualCost"
            checked={formData.useManualCost}
            onChange={handleChange}
            className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Manual Cost Override</span>
        </label>
      </div>

      {formData.useManualCost ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Project Cost (₹)</label>
          <input
            type="number"
            name="manualTotalCost"
            value={formData.manualTotalCost}
            onChange={handleChange}
            placeholder="Enter custom amount"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg font-semibold"
          />
          <p className="text-xs text-gray-500 mt-1">Enter the total project cost including GST</p>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-amber-800 font-medium">
            ℹ️ Rates are auto-calculated per system capacity and include all taxes (GST).
          </p>
        </div>
      )}

      {/* Live Preview of Cost */}
      <div className="mt-4 bg-white p-4 rounded border border-blue-200">
        <div className="flex justify-between text-lg text-gray-800 mb-3 pb-3 border-b">
          <span className="font-semibold">Total Project Cost (Inc. GST):</span>
          <span className="font-bold text-blue-900">₹ {financials.totalCost.toLocaleString('en-IN')}</span>
        </div>
        {formData.category === 'Residential' && (
          <div className="flex justify-between text-sm text-green-600 mb-1">
            <span>Less Subsidy (PM Surya Ghar):</span>
            <span>- ₹ {formData.subsidyAmount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-blue-800 mt-2 pt-2 border-t">
          <span>Net Payable:</span>
          <span>₹ {financials.finalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>

    {/* Section 4: Bank Details */}
    <div className="mb-6 border-2 border-blue-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
      <h3 className="text-xl font-bold mb-6 text-blue-900 uppercase tracking-wide border-b-2 border-blue-300 pb-2">
        Bank Account Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Name</label>
          <input
            type="text"
            name="bankAccountName"
            value={formData.bankAccountName}
            onChange={handleChange}
            placeholder="Account Holder Name"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
          <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            placeholder="1234567890123456"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono tracking-wider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code</label>
          <input
            type="text"
            name="bankIfscCode"
            value={formData.bankIfscCode}
            onChange={handleChange}
            placeholder="SBIN0001234"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono uppercase tracking-wider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
          <input
            type="text"
            name="bankBranch"
            value={formData.bankBranch}
            onChange={handleChange}
            placeholder="Branch Name"
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
          <select
            name="bankAccountType"
            value={formData.bankAccountType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
          >
            <option value="Current Account">Current Account</option>
            <option value="Savings Account">Savings Account</option>
            <option value="Business Account">Business Account</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const PrintableQuote = ({ formData, financials, handlePrint, handleDownloadPdf, isDownloading, setMode }) => (
  <div className="bg-gray-200 print:bg-white flex flex-col items-center">
    
    {/* Controls - Hide on Print */}
    <div className="w-full max-w-[210mm] print:hidden flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-b-lg text-white sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <button onClick={() => setMode('edit')} className="flex items-center gap-2 hover:text-orange-300 transition-colors text-sm font-medium">
          <RefreshCcw size={16} /> Back to Edit
        </button>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={handlePrint}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2 shadow transition-all text-sm"
        >
          <Printer size={16} /> Print
        </button>
        <button 
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 text-sm"
        >
          {isDownloading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>
    </div>

    {/* PDF Container ID for html2pdf */}
    <div id="quote-container">

      {/* --- PAGE 1: Executive Summary --- */}
      <div className="quote-page bg-white shadow-2xl print:shadow-none relative">
        <Header formData={formData} />

        {/* To Section */}
        <div className="mb-5 bg-gray-50 p-4 rounded-r-xl border-l-4 border-gray-600 w-3/4">
          <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Quotation For</h3>
          <h2 className="text-xl font-bold text-blue-900">{formData.clientName}</h2>
          <p className="text-gray-600 mt-0.5 text-xs">{formData.address}</p>
          <p className="text-gray-600 text-xs">{formData.phone}</p>
        </div>

        {/* Subject & Intro */}
        <div className="mb-5 text-gray-700 leading-relaxed">
          <p className="font-bold mb-2 text-xs">Subject: Proposal for Installation of {formData.systemSize}kW Grid-Tied Solar PV System.</p>
          <p className="text-xs text-justify leading-6 text-gray-600">
            Dear Sir/Madam,<br/><br/>
            Thank you for your interest in Jain Multiservice. We are pleased to submit our techno-commercial proposal for your requirements. 
            Based on our preliminary assessment, we have designed a system that optimizes energy generation and provides maximum return on investment.
            Moving to solar is a significant step towards energy independence and environmental sustainability.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mb-5">
          <h3 className="text-base font-bold text-blue-900 mb-4 border-b border-gray-200 pb-1.5">Project Highlights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="p-1.5 bg-orange-100 rounded-lg mr-2.5">
                  <Zap className="text-orange-500 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Plant Capacity</div>
                  <div className="text-lg font-bold text-gray-800">{formData.systemSize} kWp</div>
                </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="p-1.5 bg-blue-100 rounded-lg mr-2.5">
                  <Sun className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Est. Annual Gen</div>
                  <div className="text-lg font-bold text-gray-800">~{Math.round(formData.systemSize * 4.5 * 300).toLocaleString()} Units</div>
                </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="p-1.5 bg-green-100 rounded-lg mr-2.5">
                  <Shield className="text-green-500 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">System Type</div>
                  <div className="text-lg font-bold text-gray-800">{formData.inverterType}</div>
                </div>
            </div>
            <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="p-1.5 bg-gray-200 rounded-lg mr-2.5">
                  <CheckCircle className="text-gray-500 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Warranty</div>
                  <div className="text-lg font-bold text-gray-800">25 Years*</div>
                </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section - Styled Card */}
        <div className="mb-5 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-blue-900 border-b-2 border-blue-400 pb-2">Bank Details for Payment</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[10px]">
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">Account Name:</span>
              <span className="font-bold text-gray-800">{formData.bankAccountName || 'Not Provided'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">Bank Name:</span>
              <span className="font-bold text-gray-800">{formData.bankName || 'Not Provided'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">Account Number:</span>
              <span className="font-bold text-gray-800 font-mono">{formData.bankAccountNumber || 'XXXX-XXXX-XXXX'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">IFSC Code:</span>
              <span className="font-bold text-gray-800 font-mono uppercase">{formData.bankIfscCode || 'XXXX0000000'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">Branch:</span>
              <span className="font-bold text-gray-800">{formData.bankBranch || 'Not Provided'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200">
              <span className="text-gray-500 block mb-1 font-semibold">Account Type:</span>
              <span className="font-bold text-gray-800">{formData.bankAccountType || 'Current Account'}</span>
            </div>
          </div>
        </div>

        {/* Footer Page 1 */}
        <div className="absolute bottom-8 left-0 w-full text-center text-[10px] text-gray-400 font-medium">
          Page 1 of 3
        </div>
      </div>

      {/* --- PAGE 2: Technical Specs --- */}
      <div className="quote-page bg-white shadow-2xl print:shadow-none relative">
        <Header formData={formData} showAddress={false} />
        
        <h3 className="text-base font-bold text-blue-900 mb-4 border-l-4 border-orange-500 pl-3 bg-gray-50 py-1.5">Technical Specifications</h3>

        {/* BOM Table */}
        <table className="w-full text-xs text-left mb-5 border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 border border-blue-800 w-1/4 text-xs">Component</th>
              <th className="p-2 border border-blue-800 w-1/2 text-xs">Specification</th>
              <th className="p-2 border border-blue-800 text-right w-1/4 text-xs">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">Solar Modules</td>
              <td className="p-2 border text-gray-600">
                <div className="font-bold text-gray-800 text-[11px]">{formData.panelBrand}</div>
                <div className="text-[10px]">Mono PERC Half-Cut Technology, {formData.panelWattage}Wp+</div>
              </td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">{(() => {
                const wattage = formData.panelWattage.toString().includes('-') 
                  ? formData.panelWattage.split('-').map(Number).reduce((a, b) => a + b) / 2 
                  : Number(formData.panelWattage);
                return Math.ceil((formData.systemSize * 1000) / wattage);
              })()} Nos</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">Solar Inverter</td>
              <td className="p-2 border text-gray-600">
                <div className="font-bold text-gray-800 text-[11px]">{formData.inverterBrand} ({formData.inverterCapacity} kW)</div>
                <div className="text-[10px]">{formData.inverterType} Type, IP65 Rated, Remote Monitoring WiFi</div>
              </td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">1 No</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">Mounting Structure</td>
              <td className="p-2 border text-gray-600">
                <div className="font-bold text-gray-800 text-[11px]">Hot Dip Galvanized</div>
                <div className="text-[10px]">{formData.structureHeight}, Wind speed resistance up to 150 kmph</div>
              </td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">1 Set</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">DC Cables</td>
              <td className="p-2 border text-gray-600 text-[11px]">Polycab / Siechem (UV Protected, Tinned Copper) 4sqmm</td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">Approx 30m</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">AC Cables</td>
              <td className="p-2 border text-gray-600 text-[11px]">Polycab / Havells / Greatwhite (Copper Armored)</td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">Approx 20m</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">ACDB / DCDB</td>
              <td className="p-2 border text-gray-600 text-[11px]">Polycarbonate Box with SPD, MCB, Fuse</td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">1 Set</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">Earthing Kit</td>
              <td className="p-2 border text-gray-600 text-[11px]">Maintenance Free Chemical Earthing (3 Electrodes)</td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">3 Nos</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="p-2 border font-semibold text-gray-700 text-[11px]">Lightning Arrester</td>
              <td className="p-2 border text-gray-600 text-[11px]">Conventional Copper Bonded ESE Type</td>
              <td className="p-2 border text-right font-medium text-gray-800 text-[11px]">1 No</td>
            </tr>
          </tbody>
        </table>

        {/* Scope of Work */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">Scope of Work</h3>
          <ul className="list-disc pl-4 text-[11px] text-gray-600 space-y-1.5 marker:text-blue-500">
            <li><strong className="text-gray-800">Design & Engineering:</strong> Complete layout design and shadowing analysis.</li>
            <li><strong className="text-gray-800">Supply:</strong> Transport and delivery of all materials to the site.</li>
            <li><strong className="text-gray-800">Installation:</strong> Mounting structure civil work, module fixing, cabling, and termination.</li>
            <li><strong className="text-gray-800">Liaisoning:</strong> Handling Net Meter application with DISCOM (MSEB) and Inspection coordination.</li>
            <li><strong className="text-gray-800">Commissioning:</strong> Testing and final handover of the operational plant.</li>
          </ul>
        </div>

        {/* Exclusions */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1 text-red-700">Customer Scope (Exclusions)</h3>
          <ul className="list-disc pl-4 text-[11px] text-gray-600 space-y-1.5 marker:text-red-500">
            <li>Water supply for cleaning modules.</li>
            <li>Internet connection for remote monitoring (Inverter WiFi needs stable signal).</li>
            <li>Any major civil changes to the roof if required for stability.</li>
            <li>Standard Net Meter Fees (Govt challan) to be paid directly by customer.</li>
          </ul>
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center text-[10px] text-gray-400 font-medium">
          Page 2 of 3
        </div>
      </div>

      {/* --- PAGE 3: Commercials --- */}
      <div className="quote-page bg-white shadow-2xl print:shadow-none relative">
        <Header formData={formData} showAddress={false} />
        
        <h3 className="text-base font-bold text-blue-900 mb-4 border-l-4 border-orange-500 pl-3 bg-gray-50 py-1.5">{formData.category} Proposal</h3>

        {/* Price Table */}
        <div className="mb-5 bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-gray-50">
            <span className="text-gray-700 font-bold text-sm">System Capacity</span>
            <span className="font-bold text-base text-blue-900">{formData.systemSize} kW</span>
          </div>

          <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-blue-50">
            <span className="text-blue-900 font-bold text-sm">Total Project Value (Inc. GST)</span>
            <span className="font-bold text-lg text-blue-900">₹ {financials.totalCost.toLocaleString('en-IN')}</span>
          </div>

          {formData.category === 'Residential' && (
            <div className="p-3 border-b border-gray-300">
              <div className="flex justify-between items-center text-green-700">
                <span className="font-bold text-sm">Less: Estimated Govt. Subsidy</span>
                <span className="font-bold text-base">- ₹ {financials.subsidyAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-1 text-[9px] text-gray-500 italic">
                *Subsidy amount is subject to MNRE guidelines and is credited directly to customer account.
              </div>
            </div>
          )}

          <div className="flex justify-between items-center p-4 bg-orange-50 border-t-2 border-orange-500">
            <span className="text-lg font-extrabold text-orange-800">Net Payable Amount</span>
            <span className="text-xl font-extrabold text-orange-800">₹ {financials.finalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
            <h4 className="font-bold text-xs text-gray-800 mb-2 flex items-center border-b pb-1.5"><PenTool className="w-3 h-3 mr-1.5 text-orange-500"/> Payment Schedule</h4>
            <ul className="text-[10px] text-gray-600 space-y-2">
              <li className="flex justify-between items-center"><span>Advance along with PO:</span> <span className="font-bold bg-white px-1.5 py-0.5 rounded border text-[10px]">70%</span></li>
              <li className="flex justify-between items-center"><span>After Material Delivery:</span> <span className="font-bold bg-white px-1.5 py-0.5 rounded border text-[10px]">20%</span></li>
              <li className="flex justify-between items-center"><span>After Installation:</span> <span className="font-bold bg-white px-1.5 py-0.5 rounded border text-[10px]">10%</span></li>
            </ul>
          </div>
          
          <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
            <h4 className="font-bold text-xs text-gray-800 mb-2 flex items-center border-b pb-1.5"><Shield className="w-3 h-3 mr-1.5 text-blue-500"/> Detailed Warranty</h4>
            <ul className="text-[10px] text-gray-600 space-y-1.5">
              <li><strong className="text-gray-800">Solar Panels:</strong> 10 Years Product Warranty, 25 Years Performance.</li>
              <li><strong className="text-gray-800">Inverter:</strong> Standard 10 Years (Extendable).</li>
              <li><strong className="text-gray-800">Installation:</strong> 5 Years free service maintenance.</li>
            </ul>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-8 border border-gray-200 p-3 rounded-lg">
          <h4 className="font-bold text-xs text-gray-800 mb-1.5">Terms & Conditions</h4>
          <ul className="text-[9px] text-gray-500 list-decimal pl-3.5 space-y-0.5">
            <li>Prices are valid for 15 days from the date of quotation.</li>
            <li>Delivery of material within 1-2 weeks from the date of advance payment.</li>
            <li>Installation completion depends on site clearance and net-meter availability.</li>
            <li>Force Majeure clause applicable. Disputes subject to Solapur jurisdiction.</li>
            <li>Panel and Inverter brands are subject to availability at the time of order.</li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="flex justify-end items-end pb-5 px-3 mt-24">
          <div className="text-center w-1/3">
            <div className="border-b border-gray-400 h-8 mb-1.5"></div>
            <p className="font-bold text-[10px] text-gray-600 uppercase tracking-wide">Authorized Signatory</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center text-[10px] text-gray-400 font-medium">
          Page 3 of 3
        </div>
      </div>

    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  // --- State Management ---
  const [mode, setMode] = useState('edit'); // 'edit' or 'preview'
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLibLoaded, setIsLibLoaded] = useState(false);

  // Load html2pdf script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => setIsLibLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const [formData, setFormData] = useState({
    // Customer Details
    clientName: '',
    address: '',
    phone: '',
    date: new Date().toISOString().substr(0, 10),
    quoteRef: `JMS-${Math.floor(Math.random() * 10000)}`,

    // Project Type
    category: 'Residential', // Residential or Commercial

    // Technical Specs
    systemSize: 3, // kW
    panelBrand: 'Waree / Adani / Goldi',
    panelWattage: '560-590',
    inverterBrand: 'Growatt / Solis / Sofar',
    inverterCapacity: '3',
    inverterType: 'On-Grid', // On-Grid, Hybrid, Off-Grid
    structureHeight: 'Standard (Low Height)', // Standard, Elevated

    // Financials - Auto-calculated from tables
    subsidyAmount: 78000, // Auto-set based on capacity
    useManualCost: false, // Toggle for manual cost override
    manualTotalCost: '', // Manual cost input
    
    // Bank Details
    bankAccountName: '',
    bankName: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    bankBranch: '',
    bankAccountType: 'Current Account',
  });

  // --- Calculations ---
  const calculateFinancials = () => {
    const systemSize = parseInt(formData.systemSize) || 3;
    let totalCost = 0;
    let subsidyAmount = 0;

    // Use manual cost if enabled and provided
    if (formData.useManualCost && formData.manualTotalCost) {
      totalCost = parseFloat(formData.manualTotalCost) || 0;
      // Still calculate subsidy for residential
      if (formData.category === 'Residential') {
        const rateInfo = RESIDENTIAL_RATES[systemSize];
        if (rateInfo) {
          subsidyAmount = rateInfo.subsidy;
        }
      }
    } else {
      // Auto-calculate from rate tables
      if (formData.category === 'Commercial') {
        // Get price from commercial rate table
        totalCost = COMMERCIAL_RATES[systemSize] || 0;
      } else {
        // Get price and subsidy from residential rate table
        const rateInfo = RESIDENTIAL_RATES[systemSize];
        if (rateInfo) {
          totalCost = rateInfo.price;
          subsidyAmount = rateInfo.subsidy;
        }
      }
    }

    const finalAmount = totalCost - (formData.category === 'Residential' ? subsidyAmount : 0);
    
    return {
      totalCost, // Total with GST included
      subsidyAmount, // Auto-calculated subsidy
      finalAmount // Net Payable
    };
  };

  const financials = calculateFinancials();

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Auto-update subsidy when system size changes for Residential
      if (name === 'systemSize' && updated.category === 'Residential') {
        const size = parseInt(value) || 3;
        const rateInfo = RESIDENTIAL_RATES[size];
        if (rateInfo) {
          updated.subsidyAmount = rateInfo.subsidy;
        }
      }
      
      // Reset subsidy to 0 when switching to Commercial
      if (name === 'category' && value === 'Commercial') {
        updated.subsidyAmount = 0;
      }
      
      // Set subsidy when switching to Residential
      if (name === 'category' && value === 'Residential') {
        const size = parseInt(updated.systemSize) || 3;
        const rateInfo = RESIDENTIAL_RATES[size];
        if (rateInfo) {
          updated.subsidyAmount = rateInfo.subsidy;
        }
      }
      
      return updated;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (!isLibLoaded || !window.html2pdf) {
      alert("PDF Generator is still loading, please wait...");
      return;
    }

    setIsDownloading(true);
    const element = document.getElementById('quote-container');
    
    // Robust Configuration for html2pdf based on previous success
    const opt = {
      margin: 0,
      filename: `${formData.clientName.replace(/\s+/g, '_') || 'Client'}_Solar_Quotation.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true, 
        scrollY: 0 // Critical for preventing blank pages at top
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsDownloading(false);
    }).catch(err => {
      console.error(err);
      setIsDownloading(false);
      window.print(); // Fallback
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Print CSS Styles - The key to "Proper" PDF generation */}
      <style>{`
        @media print {
          body { 
            background: white; 
            -webkit-print-color-adjust: exact; 
          }
          .print-break { 
            page-break-after: always; 
          }
          /* This class ensures exact A4 sizing without overflow/blank pages */
          .quote-page {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            height: 100% !important;
            page-break-after: always;
            overflow: hidden;
          }
          .quote-page:last-child {
            page-break-after: avoid;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
             background: white !important;
          }
          .print\\:shadow-none {
             box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 0; /* Critical: we handle margins inside the div */
          }
        }
        
        /* For Screen View - Mimic A4 Paper */
        .quote-page {
          width: 210mm;
          min-height: 297mm;
          padding: 12mm 18mm;
          margin-bottom: 2rem;
          background: white;
          box-sizing: border-box;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Dancing+Script&display=swap');
        .font-script { font-family: 'Dancing Script', cursive; }
      `}</style>

      <nav className="bg-white shadow-sm print:hidden sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-lg font-bold text-gray-800 tracking-tight">Jain Multiservice</span>
          </div>
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Solar Quotation Generator v3.0</div>
        </div>
      </nav>

      <main className="py-8 px-4 print:p-0">
        {/* Render Components with Props */}
        {mode === 'edit' ? (
          <EditForm 
            formData={formData} 
            handleChange={handleChange} 
            financials={financials} 
            setMode={setMode} 
          />
        ) : (
          <PrintableQuote 
            formData={formData} 
            financials={financials} 
            handlePrint={handlePrint} 
            handleDownloadPdf={handleDownloadPdf} 
            isDownloading={isDownloading} 
            setMode={setMode}
          />
        )}
      </main>
    </div>
  );
};

export default App;
