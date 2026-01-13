import InputText from "../components/InputText";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal con Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Bienvenido al Dashboard {user}
          </h2>
          <p className="text-gray-600">
            Has iniciado sesión correctamente. Este es el contenido principal
            del dashboard.
          </p>
          <br />

          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Componentes
          </h2>
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            InputText
          </h3>
          <InputText
            placeholder="Ingresa tu usuario"
            type="text"
            onChange={() => {}}
          />

          <hr className="my-4"/>

          <div className="grid grid-flow-col grid-rows-3 gap-4 border border-gray-200 rounded-lg p-4">
            <div className="row-span-3 bg-gray-100 p-4">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
            <div className="col-span-2">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
            <div className="col-span-2 row-span-2">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

