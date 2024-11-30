import Image from "next/image";
import React from "react";
import TextInput from "../Input/TextInput";
import { fields } from "../fields";

const BusinessDetails = () => {
  const renderField = (field: typeof fields[0], index: number) => (
    <div
      className="flex flex-row gap-10 justify-between text-start"
      key={`${field.name}-${index}`}
    >
      <p style={{ width: "50%" }} className="font-bold">{field.name}</p>
      <div style={{ width: "50%" }}>{renderInput(field)}</div>
    </div>
  );

  const renderInput = (input: typeof fields[0]) => {
    switch (input.component) {
      case "textfield":
        return (
          <TextInput
            // value={input.value as string}
            name={input.name}
            editable={input.editable}
            onChange={(e) => console.log(e.target.value)}
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
                key={idx}
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

  // Separa los campos en dos grupos si quieres mantener la misma división
  const group1 = fields.slice(0, 7); // Por ejemplo, los primeros 7 campos
  const group2 = fields.slice(7); // Los campos restantes

  return (
    <section className="flex flex-col md:flex-row ml-[80px] mr-[50px] justify-between mt-10">
      <div className="flex gap-4 flex-col w-full md:w-1/2">
        {group1.map((field, index) => renderField(field, index))}
      </div>
      <div className="flex gap-4 flex-col w-full md:w-1/2">
        {group2.map((field, index) => renderField(field, index))}
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
