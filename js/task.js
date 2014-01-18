    //Create a new To-Do
            function createNewToDo()
            {
                var todoDictionary = {};
                
                //Prompt the user to enter To-Do
                var todo=prompt("To-Do","");
                if (todo!=null)
                {
                    if (todo == "")
                    {
                        alert("To-Do can't be empty!");
                    }
                    else
                    {
                        //Append the new To-Do with the table
                        todoDictionary = { check : 0 , text : todo};
                        addTableRow(todoDictionary,false);
                    }
                }
                
            }
            
            //Add a row to the table
            var rowID = 0;
            function addTableRow(todoDictionary, appIsLoading)
            {
                
                rowID +=1;
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                
                //Set up the CheckBox
                var cell1 = row.insertCell(0);
                var element1 = document.createElement("input");

                element1.type = "checkbox";
                element1.name="chkbox[]";
                element1.checked = todoDictionary["checkbox"];
                element1.setAttribute("onclick","checkboxClicked()");
                element1.className = "checkbox";
                cell1.appendChild(element1);

                
                //Set up the TextBox
                var cell2 = row.insertCell(1);
                var element2 = document.createElement("input");
                element2.type = "text";
                element2.name = "txtbox[]";
                element2.size = 16;
                element2.id = "text"+rowID;
                element2.value = todoDictionary["text"];
                element2.setAttribute("onchange","saveToDoList()");
                element2.className = "textbox";
                cell2.appendChild(element2);
                

                //Set up the View Button
                var cell3 = row.insertCell(2);
                var element3 = document.createElement("input");
                element3.type = "button";
                element3.id = rowID;
                element3.setAttribute("onclick","viewSelectedRow(document.getElementById('text'+this.id))");
                element3.className = "viewButton";
                cell3.appendChild(element3);
                
                //Save & Update UI
                checkboxClicked();
                saveToDoList();
                
                if (!appIsLoading)
                alert("Task Added Successfully.");
            }
            
            
            //Add storke to completed tasks text
            function checkboxClicked()
            {
                
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    var row = table.rows[i];
                    var chkbox = row.cells[0].childNodes[0];
                    var textbox = row.cells[1].childNodes[0];
                    
                    //checkbox is checked
                    if(null != chkbox && true == chkbox.checked)
                    {
                        if(null != textbox)
                        {		
                            textbox.style.setProperty("text-decoration", "line-through");
                        }
                    }
                    
                    //checkbox is not checked
                    else
                    {
                        textbox.style.setProperty("text-decoration", "none");
                    }
                    
                }
                //Save
                saveToDoList();
            }
            
            
            
            //Views textField's content of the selected row
            function viewSelectedRow(todoTextField)
            {
                alert(todoTextField.value);
            }
            
            
            //Deletes current row
            function deleteSelectedRow(deleteButton)
            {
                var p=deleteButton.parentNode.parentNode;
                p.parentNode.removeChild(p);
                saveToDoList();
            }
            

            
            
            function removeCompletedTasks()
            {
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    //Delete row if checkbox is checked
                    var row = table.rows[i];
                    var chkbox = row.cells[0].childNodes[0];
                    if(null != chkbox && true == chkbox.checked)
                    {
                        table.deleteRow(i);
                        rowCount--;
                        i--;
                    }
                    
                    
                }
                
                //Save
                saveToDoList();
                alert("Completed Tasks Were Removed Successfully.");
                
            }
            
            
            function saveToDoList()
            {
                //Create a todoArray
                var todoArray = {};
                var checkBoxState = 0;
                var textValue = "";
                
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;

                if (rowCount != 0)
                {
                    //Loop through all rows
                    for(var i=0; i<rowCount; i++)
                    {
                        var row = table.rows[i];
                        
                        //Add checkbox state
                        var chkbox = row.cells[0].childNodes[0];
                        if(null != chkbox && true == chkbox.checked)
                        {
                            checkBoxState = 1;
                        }
                        else
                        {
                            checkBoxState= 0;
                        }
                        
                        
                        //Add text data
                        var textbox = row.cells[1].childNodes[0];
                        textValue = textbox.value;
                        
                        //Fill the array with check & text data
                        todoArray["row"+i] =
                        {
                            check : checkBoxState,
                            text : textValue
                        };
                        
                    }
                }
                else
                {
                    todoArray = null;
                }
                
                //Use local storage to persist data
                //We use JSON to preserve objects
            
                window.localStorage.setItem("todoList", JSON.stringify(todoArray));
            }
            
            
            
            function loadToDoList()
            {
          
                //Get the saved To-Do list array by JSON parsing localStorage
                var theList = JSON.parse(window.localStorage.getItem("todoList"));
                
                
                if (null == theList || theList=="null")
                {
                    deleteAllRows();
                }
                else
                {
                    var count = 0;
                    for (var obj in theList)
                    {
                        count++;
                    }
                    
                    //Clear table
                    deleteAllRows();
                    //Loop through all rows
                    for(var i=0; i<count; i++)
                    {
                        //Add row
                        addTableRow(theList["row"+i],true);
                    }
                    
                }
           
            }
            
            
            
            function deleteAllRows()
            {
                //Get current table
                var table = document.getElementById("dataTable");
                var rowCount = table.rows.length;
                
                //Loop through all rows
                for(var i=0; i<rowCount; i++)
                {
                    //delete row
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
                
                //Save
                saveToDoList();
            }
            
            
        

