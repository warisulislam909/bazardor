import Hero from "@/components/Hero"; import ProductSections from "@/components/ProductSections";
export default function Home(){return <div className="container"><Hero/><div className="market-note"><span>📍</span><p><strong>আজকের বাজার আপডেট</strong><br/><small>ঢাকার নির্বাচিত বাজারের গড় খুচরা দাম</small></p><span className="note-date">● লাইভ আপডেট</span></div><ProductSections/></div>}
