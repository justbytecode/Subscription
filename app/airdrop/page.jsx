import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, CheckCircle, Clock, Coins, ExternalLink, Twitter, Linkedin, Send, ChevronRight, Bitcoin, X } from 'lucide-react'

export default function AirdropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#0a0a20] text-white">
     

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm animate-pulse">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Airdrop Start  in Some days</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">
            Claim Your Free Tokens
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our community and receive exclusive tokens as part of our launch campaign. Complete simple tasks to
            increase your allocation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/wait-list" passHref>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-lg px-8 py-6 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-700/40 group">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="https://t.me/recurxtoken2025" target="_blank" rel="noopener noreferrer" passHref>
              <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-gray-200 text-lg px-8 py-6 transition-all duration-300 group">
                {/* <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> */}
                Join the Telegram Community
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span>10,00+ Participants</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span>1,000,00 Tokens</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span>No Gas Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="container mx-auto px-4 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0d1025] to-[#101540] p-8 rounded-2xl border border-blue-900/50 shadow-xl shadow-blue-900/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Join Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161a36] p-6 rounded-xl border border-blue-700/30 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-900/20 group hover:-translate-y-1 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
                  <X className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">X </h3>
                <p className="text-gray-400 mb-4">Follow us for the latest updates and announcements</p>
                <Link href="https://x.com/PayRecurx" target="_blank" rel="noopener noreferrer" passHref className="w-full">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full group-hover:bg-blue-500 transition-colors">
                    <Twitter className="h-4 w-4 mr-2" />
                    Follow on X
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#161a36] p-6 rounded-xl border border-blue-700/30 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-900/20 group hover:-translate-y-1 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
                  <Linkedin className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">LinkedIn</h3>
                <p className="text-gray-400 mb-4">Connect with our team and stay informed about our progress</p>
                <Link href="https://linkedin.com/company/cryptoairdrop" target="_blank" rel="noopener noreferrer" passHref className="w-full">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full group-hover:bg-blue-500 transition-colors">
                    <Linkedin className="h-4 w-4 mr-2" />
                    Connect on LinkedIn
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#161a36] p-6 rounded-xl border border-blue-700/30 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-900/20 group hover:-translate-y-1 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
                  <Send className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Telegram</h3>
                <p className="text-gray-400 mb-4">Join our active community for discussions and support</p>
                <Link href="https://t.me/recurxtoken2025" target="_blank" rel="noopener noreferrer" passHref className="w-full">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full group-hover:bg-blue-500 transition-colors">
                    <Send className="h-4 w-4 mr-2" />
                    Join Telegram Group
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="container mx-auto px-4 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Why Join Our Airdrop?
          </h2>

          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              If you missed Bitcoin in 2014, then you can rewrite your destiny with 
              <span className="text-blue-400 font-bold"> Recurx (RCX)</span> token.
            </p>
          </div>

          <div className="bg-[#0d1025] rounded-2xl border border-blue-900/50 overflow-hidden shadow-xl shadow-blue-900/20">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gray-800/50 rounded-full blur-xl -z-10"></div>
                <h3 className="text-2xl font-bold mb-6 text-gray-400 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <Bitcoin className="h-5 w-5 text-gray-500" />
                  </div>
                  Bitcoin in 2014
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-400">Price was around $800</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-400">Early adopters made 75,000% returns</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-400">Limited mainstream adoption</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-400">Many people missed the opportunity</p>
                  </li>
                </ul>
              </div>

              <div className="p-8 md:p-10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-l border-blue-900/50 relative">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <Coins className="h-5 w-5 text-blue-400" />
                  </div>
                  Recurx (RCX) Today
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-white">Ground floor opportunity at launch price</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-white">Revolutionary technology with real-world use cases</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-white">Potential for exponential growth</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-white">Free tokens available through our airdrop</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-8 bg-[#161a36] border-t border-blue-900/50">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-white">Don't miss out twice!</h4>
                  <p className="text-gray-300">Join the Recurx revolution today</p>
                </div>
                <Link href="/wait-list" passHref>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 px-8 py-6 transition-all duration-300 shadow-lg shadow-blue-600/20 group">
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-[#0d1025] rounded-xl border border-blue-900/50 px-6 shadow-lg shadow-blue-900/10">
              <AccordionTrigger className="text-lg font-medium py-4 hover:text-blue-400 transition-colors">
                What is an airdrop?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">
                An airdrop is a distribution of cryptocurrency tokens to multiple wallet addresses, usually for free.
                Projects use airdrops as a marketing strategy to increase awareness and adoption.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-[#0d1025] rounded-xl border border-blue-900/50 px-6 shadow-lg shadow-blue-900/10">
              <AccordionTrigger className="text-lg font-medium py-4 hover:text-blue-400 transition-colors">
                How do I claim my tokens?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">
                To claim your tokens, connect your wallet, complete the required tasks, and submit your information.
                Tokens will be distributed to eligible participants after the airdrop period ends.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-[#0d1025] rounded-xl border border-blue-900/50 px-6 shadow-lg shadow-blue-900/10">
              <AccordionTrigger className="text-lg font-medium py-4 hover:text-blue-400 transition-colors">
                When will I receive my tokens?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">
                Tokens will be distributed within 14 days after the airdrop campaign ends. You'll receive a notification
                email once your tokens have been sent to your wallet.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-[#0d1025] rounded-xl border border-blue-900/50 px-6 shadow-lg shadow-blue-900/10">
              <AccordionTrigger className="text-lg font-medium py-4 hover:text-blue-400 transition-colors">
                Is there a fee to participate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">
                No, participation in our airdrop is completely free. You don't need to pay any fees to receive tokens.
                We cover all gas fees for the token distribution.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl -z-10 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 text-center border border-blue-700/50 shadow-xl shadow-blue-900/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of participants who have already claimed their tokens. Limited time offer - airdrop ends
            soon!
          </p>
          <Link href="/wait-list" passHref>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-lg px-8 py-6 transition-all duration-300 shadow-lg shadow-blue-600/20 group">
              Join the Waitlist to Claim Your Tokens
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>    
    </div>
  )
}
