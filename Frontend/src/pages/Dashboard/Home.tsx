import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import Calendar from "../../pages/Calendar";
import PageMeta from "../../components/common/PageMeta";


export default function Home() {
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7" style={{display: "none"}}>
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 space-y-12 xl:col-span-12" style={{ display: "none" }}>
          <Calendar />
        </div>
      </div>
    </>
  );
}
