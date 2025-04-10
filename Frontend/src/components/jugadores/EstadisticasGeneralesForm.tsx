import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import DatePicker from "../form/date-picker";
import { NuevaEstadistica } from "../../types/estadistica";
import { Save, Plus } from "lucide-react";

type EstadisticasFormProps = {
  nuevoRegistro: NuevaEstadistica;
  onInputChange: (field: keyof NuevaEstadistica, value: string | number) => void;
  onGuardar: () => void;
};

const EstadisticasForm: React.FC<EstadisticasFormProps> = ({ nuevoRegistro, onInputChange, onGuardar }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {Object.keys(nuevoRegistro).map((key) =>
          key !== "jugador" ? (
            <div key={key} className="flex flex-col space-y-1.5">
              <Label htmlFor={key}>{key.replace(/_/g, " ")}</Label>
              {key === "fecha" ? (
                <DatePicker
                  id="fecha"
                  placeholder="YYYY-MM-DD"
                  onChange={(date, formatted) => {
                    onInputChange("fecha", formatted);
                  }}
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600 border-gray-300"
                />
              ) : (
                <Input
                  id={key}
                  type="number"
                  placeholder={`Ingrese ${key.replace(/_/g, " ")}`}
                  value={nuevoRegistro[key as keyof NuevaEstadistica]}
                  onChange={(e) =>
                    onInputChange(key as keyof NuevaEstadistica, e.target.value)
                  }
                  className="dark:bg-gray-800 dark:text-white dark:border-gray-600 border-gray-300"
                />
              )}
            </div>
          ) : null
        )}
      </div>

      <div className="text-right">
        <button
          onClick={onGuardar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Save size={20} />
        </button>
      </div>
    </div>
  );
};

export default EstadisticasForm;
