import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";

function Courses() {
  const [listData, setListData] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", shortName: "", fee: "" });

  useEffect(() => {
    // Fetch data during component rendering
    axios.get("http://localhost:5000/course")
      .then((res) => {
        setListData([...res.data.data]);
      })
      .catch((err) => {
        console.error("Axios Error:", err.message);
      });
  }, []); // Empty dependency array to ensure it runs only once during component mounting

  const deleteCourse = (courseId) => {
    axios.delete(`http://localhost:5000/course/${courseId}`)
      .then(() => {
        setListData((prevData) => prevData.filter(course => course._id !== courseId));
      })
      .catch((err) => {
        console.error("Axios Error:", err.message);
      });
  };

  const addCourse = () => {
    axios.post("http://localhost:5000/course", newCourse)
      .then((res) => {
        setListData((prevData) => [...prevData, res.data.data]);
        setNewCourse({ name: "", shortName: "", fee: "" });
      })
      .catch((err) => {
        console.error("Axios Error:", err.message);
      });
  };

  const editCourse = (courseId, updatedCourse) => {
    const url = `http://localhost:5000/course/${courseId}`;
    console.log("Edit Course URL:", url);
  
    axios.put(url, updatedCourse)
      .then(() => {
        // Update the state after successful update
        setListData((prevData) =>
          prevData.map(course => (course._id === courseId ? { ...course, ...updatedCourse } : course))
        );
      })
      .catch((err) => {
        console.error("Axios Error:", err.message);
      });
  };
  
  

  return (
    <>
      <Box bg="white">
        <Box mx="auto" maxW="2xl" px={4} py={16} sm={{ px: 6, py: 24 }} lg={{ maxW: '7xl', px: 8 }}>

          {/* Add course input form */}
          <Box mt={6}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Add New Course
            </Text>
            <Box display="flex" alignItems="center">
              <Input
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              />
              <Input
                placeholder="Short Name"
                value={newCourse.shortName}
                onChange={(e) => setNewCourse({ ...newCourse, shortName: e.target.value })}
              />
              <Input
                placeholder="Course Fee"
                value={newCourse.fee}
                onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
              />
              <Button onClick={addCourse} colorScheme="teal" ml={2}>
                Add
              </Button>
            </Box>
          </Box>

          <Table mt={6} variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Course Name</Th>
                <Th>Short Name</Th>
                <Th>Course Fee</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listData.map((course, i) => (
                <Tr key={i}>
                  <Td>{course.name}</Td>
                  <Td>{course.shortName}</Td>
                  <Td>{course.fee}</Td>
                  <Td>
                    <Button onClick={() => deleteCourse(course._id)} colorScheme="red" size="sm">
                      Delete
                    </Button>
                    <Button onClick={() => editCourse(course._id, { name: "Updated Course" })} colorScheme="teal" size="sm" ml={2}>
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default Courses;
