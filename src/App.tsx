import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DataTable from "./components/DataTable";
import CustomizeList from "./components/CustomizeList";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const sampleData = [
    {
      id: 1,
      organization: "Org A",
      parentOrganization: "Parent Org A",
      decisions: 12,
      delegations: 6,
      status: "Active",
      isExpandable: true,
      extraInfo: {
        foundedYear: 1995,
        CEO: "John Doe",
      },
    },
    {
      id: 2,
      organization: "Org B",
      parentOrganization: "Parent Org B",
      decisions: 7,
      delegations: 3,
      status: "Inactive",
      isExpandable: false,
    },
    {
      id: 3,
      organization: "Org C",
      parentOrganization: "Parent Org C",
      decisions: 15,
      delegations: 8,
      status: "Active",
      isExpandable: true,
      extraInfo: {
        foundedYear: 1995,
        CEO: "John Doe",
      },
    },
    {
      id: 4,
      organization: "Org D",
      parentOrganization: "Parent Org D",
      decisions: 5,
      delegations: 2,
      status: "Active",
      isExpandable: false,
    },
    {
      id: 5,
      organization: "Org E",
      parentOrganization: "Parent Org E",
      decisions: 10,
      delegations: 4,
      status: "Inactive",
      isExpandable: false,
    },
    {
      id: 6,
      organization: "Org F",
      parentOrganization: "Parent Org F",
      decisions: 20,
      delegations: 9,
      status: "Active",
      isExpandable: true,
      extraInfo: {
        foundedYear: 1995,
        CEO: "John Doe",
      },
    },
    {
      id: 7,
      organization: "Org G",
      parentOrganization: "Parent Org G",
      decisions: 8,
      delegations: 3,
      status: "Active",
      isExpandable: true,
      extraInfo: {
        foundedYear: 1995,
        CEO: "John Doe",
      },
    },
  ];
  
  

  return (
    <Provider store={store}>
      <Button onClick={() => setOpen(true)}>Customize Columns</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Customize Columns"
      >
        <CustomizeList onClose={() => setOpen(false)} />
      </Drawer>
      <DataTable data={sampleData} />
    </Provider>
  );
};

export default App;
