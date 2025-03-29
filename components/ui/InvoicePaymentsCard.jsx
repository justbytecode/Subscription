import { useState } from "react";
import { Clock, ArrowUpRight, BarChart3, ChevronDown, Landmark, Copy, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

export default function InvoicePaymentsCard() {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(null);
  
  // Sample invoice data
  const invoice = {
    id: "INV-2025-042",
    title: "NFT Marketplace Purchase",
    status: "Confirmed",
    date: "March 28, 2025",
    amount: 0.45,
    currency: "ETH",
    usdValue: 1687.50,
    network: "Ethereum",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    txHash: "0xe756b5b6e761865bd6a94f65a1b5e29ec76c2e9a376c286c4f53c483b2fd9f15",
    confirmations: 24,
    items: [
      { name: "CryptoArt #3829", price: 0.35, quantity: 1 },
      { name: "Gas Fee", price: 0.10, quantity: 1 }
    ]
  };
  
  const toggleExpand = () => setExpanded(!expanded);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const truncateText = (text, length = 6) => {
    if (!text) return '';
    return `${text.substring(0, length)}...${text.substring(text.length - 4)}`;
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return <CheckCircle2 size={16} className="mr-2 text-green-500" />;
      case 'pending': return <Clock size={16} className="mr-2 text-yellow-500" />;
      case 'unconfirmed': return <AlertCircle size={16} className="mr-2 text-red-500" />;
      default: return <Clock size={16} className="mr-2 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'unconfirmed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-1 rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl p-6 text-white h-full justify-center">
      {/* Card Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h3 className="text-2xl font-medium">{invoice.title}</h3>
        <div className={`px-3 py-1 ${getStatusColor(invoice.status)} rounded-full text-sm font-semibold`}>
          {invoice.status}
        </div>
      </div>
      
      {/* Main Invoice Info */}
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-white/70">Invoice ID</p>
          <p className="font-bold text-lg">{invoice.id}</p>
          <p className="text-xs text-white/50">{invoice.date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/70">Amount</p>
          <p className="font-bold text-lg">{invoice.amount} {invoice.currency}</p>
          <p className="text-xs text-white/50">≈ ${invoice.usdValue.toFixed(2)} USD</p>
        </div>
      </div>

      {/* Blockchain Details */}
      <div className="grid grid-cols-1 gap-4 mt-2">
        {/* Payment Address */}
        <div className="bg-zinc-800 p-3 rounded-lg">
          <p className="text-sm text-white/70 mb-1">Payment Address</p>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-300">{truncateText(invoice.address, 10)}</code>
            <button 
              onClick={() => copyToClipboard(invoice.address, 'address')}
              className="text-blue-400 hover:text-blue-300 transition-colors"
              title="Copy address"
            >
              {copied === 'address' ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Transaction Hash */}
        <div className="bg-zinc-800 p-3 rounded-lg">
          <p className="text-sm text-white/70 mb-1">Transaction Hash</p>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-300">{truncateText(invoice.txHash, 10)}</code>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => copyToClipboard(invoice.txHash, 'txHash')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="Copy transaction hash"
              >
                {copied === 'txHash' ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
              <a 
                href={`https://etherscan.io/tx/${invoice.txHash}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="View on Etherscan"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          <div className="flex items-center mt-2 text-xs text-white/70">
            <p><span className="text-white/50">Network:</span> {invoice.network}</p>
            <p className="ml-4"><span className="text-white/50">Confirmations:</span> {invoice.confirmations}</p>
          </div>
        </div>
      </div>

      {/* Transaction Details Toggle */}
      <button
        onClick={toggleExpand}
        className="flex items-center justify-between w-full py-2 text-left transition-all hover:opacity-75 mt-2"
      >
        <span className="font-medium flex items-center">
          <BarChart3 size={16} className="mr-2" /> Invoice Details
        </span>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      
      {/* Transaction Details */}
      {expanded && (
        <div className="bg-zinc-800 p-4 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-white/70">Item</th>
                <th className="text-right py-2 text-white/70">Quantity</th>
                <th className="text-right py-2 text-white/70">Price</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-none">
                  <td className="py-2">{item.name}</td>
                  <td className="text-right py-2">{item.quantity}</td>
                  <td className="text-right py-2 font-medium">{item.price} {invoice.currency}</td>
                </tr>
              ))}
              <tr className="font-semibold text-white">
                <td className="pt-3" colSpan={2}>Total</td>
                <td className="text-right pt-3">{invoice.amount} {invoice.currency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-800 pt-2">
       <span>Powred by - RecurX</span>
        {/* <div className="flex items-center text-sm text-white/70">
          <Landmark size={14} className="mr-2" /> 
          {getStatusIcon(invoice.status)}
          <span>{invoice.status} on {invoice.date}</span>
        </div>
        <a 
          href={`https://etherscan.io/tx/${invoice.txHash}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
        >
          View Transaction <ArrowUpRight size={16} className="ml-2" />
        </a> */}
      </div>
    </div>
  );
}