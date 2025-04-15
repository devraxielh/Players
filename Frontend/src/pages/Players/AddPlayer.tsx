import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import AddPlayerForm from '../../components/players/AddPlayerForm';

const AddPlayer = () => {
  return (
    <>
      <PageBreadCrumb pageTitle="Agregar Jugador" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <AddPlayerForm />
        </div>
      </div>
    </>
  );
};

export default AddPlayer;
