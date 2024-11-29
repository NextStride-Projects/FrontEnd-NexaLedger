import Image from "next/image";
import React from "react";

const BusinessDetails = () => {
  const fields = [
    {
      name: "ID",
      value: "A001",
      component: "none",
      editable: false,
    },
    {
      name: "Nombre de la empresa",
      value: "Proem Security",
      component: "textfield",
      editable: false,
    },
    {
      name: "Descripcion detallada",
      value:
        "Empresa encargada a intalación y mantenimiento de integración tecnológica",
      component: "textarea",
      editable: false,
    },
    {
      name: "Alias",
      value: "PROEM",
      component: "textfield",
      editable: false,
    },
    {
      name: "Ubicación",
      value: "Bogota, Colombia",
      component: "textfield",
      editable: false,
    },
    {
      name: "Características",
      value: ["Mecánico", "Material Plastico", "Text", "Text"],
      component: "multitextfield",
      editable: false,
    },
    {
      name: "Categoría",
      value: "Servicios",
      component: "textfield",
      editable: false,
    },
  ];

  const fields2 = [
    {
      name: "Activo",
      value: "true",
      component: "checkbox",
      editable: false,
    },
    {
      name: "Persona Encargada",
      value: "Julio Esparragoza",
      component: "textfield",
      editable: false,
    },
    {
      name: "Correo Electrónico",
      value: "veronika@proemsecurity.com",
      component: "textfield",
      editable: false,
    },
  ];

  const renderField = (field: (typeof fields)[0]) => (
    <div
      className="flex flex-row gap-10 justify-between text-start"
      key={field.name}
    >
      <p style={{ width: "50%" }} className="font-bold">{field.name}</p>
      <div style={{ width: "50%" }}>{renderInput(field)}</div>
    </div>
  );

  const renderInput = (input: (typeof fields)[0]) => {
    switch (input.component) {
      case "textfield":
        return (
          <input
            type="text"
            value={input.value}
            name={input.name}
            disabled={!input.editable}
            style={{
              width: "250px",
              padding: 5,
              border: "1px solid #ccc",
              borderRadius: 5,
            }}
          />
        );
      case "textarea":
        return (
          <textarea
            value={input.value}
            rows={6}
            style={{
              width: "250px",
              padding: 5,
              border: "1px solid #ccc",
              borderRadius: 5,
            }}
            name={input.name}
            disabled={!input.editable}
          />
        );
      case "multitextfield":
        return (
          <div
            style={{
              height: "150px",
              width: "280px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {(input.value as string[]).map((value, idx) => (
              <input
                type="text"
                value={value}
                name={input.name + idx}
                disabled={!input.editable}
                style={{
                  width: "250px",
                  padding: 5,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
              />
            ))}
          </div>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={Boolean(input.value)}
            name={input.name}
            disabled={!input.editable}
            style={{
              padding: 5,
              width: "25px",
              marginRight: "200px",
              height: "25px",
              border: "1px solid #ccc",
              borderRadius: 5,
            }}
          />
        );
      default:
        return (
          <p style={{ textAlign: "start", width: "250px" }}>{input.value}</p>
        );
    }
  };

  return (
    <section className="flex flex-row ml-[80px] mr-[50px] justify-between mt-10">
      <div className="flex gap-4 flex-col">
        {fields.map((field) => renderField(field))}
      </div>
      <div className="flex gap-4 flex-col">
        {fields2.map((field) => renderField(field))}
        <div key={"Logo"}>
          <p className="font-bold">Logo Empresa</p>
          <Image
            src="/logoempresa.png"
            alt="Logo Empres"
            width={200}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
