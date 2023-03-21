import React, {useState} from "react";
import "./App.css";
import "./custom.scss";

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

// Import DataTables
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import $ from "jquery";
import "datatables.net";

function App() {
  const dataTableRef = React.useRef<HTMLTableElement>(null);

    React.useEffect(() => {
      console.log("nag run");

      const table = $(dataTableRef.current!).DataTable({
        columns: [
          { data: "name" },
          { data: "region" },
          { data: "area" }
        ]
      });
      
      $.ajax({
        url: "https://restcountries.com/v2/all?fields=name,region,area",
        dataType: "json",
        success: function (data) {   
          data.forEach((country: { name: any; region: any; area: any; }) => {
            // add data to table
            table.row.add(country);
          });
    
          // draw table
          table.draw();
        },
      });
    }, []);
      
    // if #filter-by-area is clicked, change dropdown text value to "Smaller than Lithuania by Area" and regenerate table
      const handleFilterByAreaClick = () => {
        const dropdown = document.getElementById("dropdown-basic");
        dropdown!.innerHTML = "Smaller than Lithuania by Area";
    
        const table = $(dataTableRef.current!).DataTable();
        table.clear().draw();
    
        $.ajax({
          url:
            "https://restcountries.com/v2/all?fields=name,region,area;search=area;<65300",
          dataType: "json",
          success: function (data) {
            data.forEach((country: { name: any; region: any; area: any }) => {            
              // add data to table if area is smaller than Lithuania
              if (country.area < 65300){
                table.row.add(country);
              }

            });
            // draw table
            table.draw();
          },
        });
      };

    // if #in-oceania is clicked, change dropdown text value to "In Oceania Region" and regenerate table    
      const handleInOceaniaClick = () => {
        const dropdown = document.getElementById("dropdown-basic");
        dropdown!.innerHTML = "In Oceania Region";
    
        const table = $(dataTableRef.current!).DataTable();
        table.clear().draw();
    
        $.ajax({
          url:
            "https://restcountries.com/v2/region/oceania?fields=name,region,area",
          dataType: "json",
          success: function (data) {
            data.forEach((country: { name: any; region: any; area: any }) => {
              // add data to table
              if (country.region === "Oceania"){
                table.row.add(country);
              }
            });
            // draw table
            table.draw();
          },
        });
      };

    // if #none is clicked, change dropdown text value to "Filter countries by:" and regenerate table
    const handleFilterByNone = () => {
      const dropdown = document.getElementById("dropdown-basic");
      dropdown!.innerHTML = "Filter countries by:";
  
      const table = $(dataTableRef.current!).DataTable();
      table.clear().draw();
  
      $.ajax({
        url:
          "https://restcountries.com/v2/all?fields=name,region,area;search=area;<65300",
        dataType: "json",
        success: function (data) {
          data.forEach((country: { name: any; region: any; area: any }) => {            
              table.row.add(country);

          });
          // draw table
          table.draw();
        },
      });
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="" className="fw-bold mt-3">
          COUNTRIES HOMEWORK
        </h1>
      </header>

      <div>
        <div className="data-filters ps-5 ms-5 mb-4">
          <div className="d-inline-flex">
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Filter countries by:
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/none" onClick={handleFilterByNone}>None</Dropdown.Item>
                <Dropdown.Item id="filter-by-area" href="#/filter-by-area" onClick={handleFilterByAreaClick}>
                  Smaller than Lithuania by Area
                </Dropdown.Item>
                <Dropdown.Item id="in-oceania" href="#/in-oceania" onClick={handleInOceaniaClick}>
                  In Oceania Region
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="row px-5">
          <div className="col-lg-12 px-5">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between pb-0 pe-0">
                  <h5 className="card-title fw-bold align-middle mb-2">Countries List</h5>
              </div>
              <div className="card-body">
                <div className="flex-grow-1 ms-2">
                  <div id="table-container" className="table">
                    <table className="table nowrap table-responsive table-light dt-responsive" ref={dataTableRef}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Region</th>
                          <th>Area</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;