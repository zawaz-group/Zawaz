import CustomOrder from "./CustomOrder";
import Faq from "./Faq";

export default function CustomAndFaq({ faq = [] }) {
  const items = faq.map((f) => ({ q: f.intrebare, a: f.raspuns })).filter((f) => f.q && f.a);

  return (
    <section id="personalizate" className="mx-5 scroll-mt-24 py-10 lg:ml-[9.8vw] lg:mr-[9.7vw] lg:py-[2.4vw]">
      <div className={`grid gap-10 lg:gap-[2.4vw] ${items.length ? "lg:grid-cols-[1.12fr_1fr]" : "mx-auto max-w-[56rem]"}`}>
        <CustomOrder />
        <Faq items={items} />
      </div>
    </section>
  );
}
