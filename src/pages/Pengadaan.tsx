import Breadcrumb from '../components/Breadcrumb';
import TableTemp from '../components/TableTemp';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Pengadaan' />

      <div className="flex flex-col gap-10">
        <TableTemp />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
