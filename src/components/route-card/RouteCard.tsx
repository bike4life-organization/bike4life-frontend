import React, {useContext, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import RouteServices from "../../services/RouteServices";
import {RoutesContext} from "../../context/route/routes-context";
import {CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {toast} from "react-toastify";
import {TransitionProps} from "@mui/material/transitions";

const RouteCard = ({route}: any) => {
    const {routes, setRoutes} = useContext(RoutesContext);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHandler = (routeId: any) => {
        RouteServices.remove(routeId).then((res) => {
            if (res.data == "OK") {
                const newRoutes = routes?.filter((route: any) => route._id !== routeId);
                setRoutes(newRoutes);
                toast.success('Route removed', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });
        handleClose();
    };

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const alert = () => {
        return (<Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Do you want to delete the route?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Once the route is deleted, it cannot be recovered.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => deleteHandler(route._id)}>Ok</Button>
            </DialogActions>
        </Dialog>)
    }

    return (
        <>
            <Card variant="outlined" sx={{width: '60%'}} style={{backgroundColor: "#F9FBFa"}}>
                <CardContent style={{textAlign: "center"}}>
                    <Typography sx={{mb: 1.5}} color="text.secondary" gutterBottom>
                        <b>Name: </b>
                        {route.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <b>Description: </b>
                        {route.description}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <b>Estimated duration: </b>
                        {`${route.estimatedDuration} min`}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <b>Date: </b>
                        {route?.date }
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent: "center"}}>
                    <Button variant="outlined">
                        <Link
                            style={{textDecoration: "none"}}
                            to={`/view-route/` + route._id}
                        >
                            {" "}
                            More information
                        </Link>
                    </Button>
                    <Button variant="outlined">
                        <Link
                            style={{textDecoration: "none"}}
                            to={`/edit-route/` + route._id}
                        >
                            {" "}
                            Edit
                        </Link>
                    </Button>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
            {open && alert()}
        </>
    );
};

export default RouteCard;
