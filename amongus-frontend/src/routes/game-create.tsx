import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Task } from "../types/GameTypes";
import { Paper } from '@mui/material';
export default function CreationPage() {

  const [rows, setRows] = useState<Task[]>();
  const [players, setPlayers] = useState([]); //Remove default names later
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response => response.json()).then(value => {
      setRows(value.result.entries);
      console.log(value.result);
    }).catch(err => {
      console.error(err);
    });
    
    socket.emit("join", "room");
  
  }, [])

  socket.on("clientList", (clientList) => {

    setPlayers(clientList);

  });

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Task
      </Button>
    </GridToolbarContainer>
  );
}
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows?.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  function TaskContainer() {
    return (

      <DataGrid 
        rows={rows} 
        columns={columns}
        editMode='row' 
        rowModesModel={rowModesModel} 
        onRowModesModelChange={handleRowModesModelChange} 
        onRowEditStop={handleRowEditStop} 
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar']
        }}
        slotProps={{
          toolbar: {setRows, setRowModesModel}
        }}  > 
      </DataGrid>
      
    );
  }

  const gameCode = getRandomInt(50000);
  return (
    <Box>
      <Navbar />

      <div className='flex w-full h-full flex-col items-center'>

        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-2">
          Game Code: {gameCode}
        </p>
        <Stack spacing={10} direction="row">
          <Box alignItems="center" display="flex" flexDirection="column" gap={2}>
            <Stack spacing={20} direction={"row"}>
              <TaskContainer />
            </Stack>
            <Box justifyContent="space-around" alignItems="center" display="flex" gap={2} width={"100%"}>
              <Button variant="outlined" color='secondary' sx={{ marginLeft: "auto", marginRight: "auto" }}>Start</Button>
              <Fab size="small" color="secondary" aria-label="add" sx={{alignSelf:"flex-end"}}>
                <AddIcon />
              </Fab>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">({players.length}/10)</Typography>
            </Box>
            <List sx={{ border: '1px solid white', width: '25vh', padding: 2 }} component={Paper} elevation={0}>
              {players.map((player) => (
                <Paper key={player} elevation={1}><ListItemText><Typography fontFamily={"Comfortaa"}>{player}</Typography></ListItemText></Paper>
              ))}
            </List>
            <Button variant="outlined" color='secondary'>Game Settings</Button>
          </Box>
        </Stack>
      </div >
    </Box>
  )

}