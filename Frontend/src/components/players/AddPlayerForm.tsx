import { useState } from 'react';
import Input from '../../components/form/input/InputField';

interface PlayerFormData {
  name: string;
  position: string;
  number: string;
  age: string;
}

const AddPlayerForm = () => {
  const [formData, setFormData] = useState<PlayerFormData>({
    name: '',
    position: '',
    number: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save player
    console.log('Player data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Agregar Nuevo Jugador
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Nombre del Jugador
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre del jugador"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Posición
          </label>
          <Input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Ingrese la posición del jugador"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Número
          </label>
          <Input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Ingrese el número del jugador"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Edad
          </label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Ingrese la edad del jugador"
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
        >
          Guardar Jugador
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
