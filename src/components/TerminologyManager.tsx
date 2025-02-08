import React, { useEffect, useState } from "react";
import { fetchTerminologyData, syncTerminologyData } from "@/Utils/request/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TerminologyManager = () => {
  const [terminologyData, setTerminologyData] = useState([]);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTerminologyData();
        setTerminologyData(data);
        setEditedData(data);
      } catch (error) {
        console.error("Error fetching terminology data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...editedData];
    updatedData[index][field] = value;
    setEditedData(updatedData);
  };

  const handleSave = async () => {
    try {
      const syncResponse = await syncTerminologyData(editedData);
      console.log("Synced terminology data:", syncResponse);
    } catch (error) {
      console.error("Error syncing terminology data:", error);
    }
  };

  return (
    <div>
      <h1>Terminology Manager</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Term</TableHead>
            <TableHead>Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  value={item.term}
                  onChange={(e) => handleInputChange(index, "term", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.definition}
                  onChange={(e) => handleInputChange(index, "definition", e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default TerminologyManager;
