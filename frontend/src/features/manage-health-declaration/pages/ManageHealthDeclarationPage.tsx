import React, { useState, useEffect } from "react";
import { Table } from "antd";
import DeclarationRecord from "../../../types";

const ManageHealthDeclarationPage = () => {
  const [records, setRecords] = useState<DeclarationRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = [
        {
          name: "John Doe",
          temperature: 36.5,
          symptoms: ["cough", "fever"],
          contactedWithCovid19Suspects: false,
        },
        {
          name: "Jane Smith",
          temperature: 37.2,
          symptoms: ["fatigue", "sore throat"],
          contactedWithCovid19Suspects: true,
        },
      ];

      setRecords(data);
    };

    fetchRecords();
  }, []);

  const handleEdit = (record: DeclarationRecord) => {
    console.log("Edit record", record);
  };

  const handleDelete = (record: DeclarationRecord) => {
    console.log("Delete record", record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: "Symptoms",
      dataIndex: "symptoms",
      key: "symptoms",
      render: (symptoms: string[]) => symptoms.join(", "),
    },
    {
      title: "Contacted with COVID-19 Suspects",
      dataIndex: "contactedWithCovid19Suspects",
      key: "contactedWithCovid19Suspects",
      render: (contactedWithCovid19Suspects: boolean) =>
        contactedWithCovid19Suspects ? "yes" : "no",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: DeclarationRecord) => (
        <span className="text-lg">
          <button onClick={() => handleEdit(record)}>
            <i className="fa-solid fa-pen-to-square pr-2 cursor-pointer text-blue-800"></i>
          </button>
          <button onClick={() => handleDelete(record)}>
            <i className="fa-solid fa-trash pr-2 cursor-pointer text-red-600"></i>
          </button>
        </span>
      ),
    },
  ];

  return (
    <div className="manage-health-declaration-page flex items-center justify-center">
      <div className="w-full my-8 flex flex-col items-center justify-center w-full max-w-3xl">
        <div className="form-top rounded-t w-full h-max">
          <div className="bg-linear-to-r from-amber-500 to-transparent text-white text-4xl font-bold px-6 py-12">
            Manage Health Declarations
          </div>
        </div>
        <div className="bg-white p-6 rounded-b shadow-md w-full">
          <Table columns={columns} dataSource={records} />
        </div>
      </div>
    </div>
  );
};

export default ManageHealthDeclarationPage;
