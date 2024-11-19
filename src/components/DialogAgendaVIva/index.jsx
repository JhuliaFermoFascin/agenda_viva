import React from "react"
const { Dialog, DialogTitle, DialogContentText, Button } = require("@mui/material")

const DialogAgendaViva = ({ description, title, onClickSim, onClickNao, isOpen, style }) => {
    return (
        <Dialog open={isOpen} fullWidth>
            <div style={{style}}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContentText>
                    {description}
                </DialogContentText>
                <Button onClick={onClickSim}>
                    Sim
                </Button>
                <Button onClick={onClickNao}>
                    Não
                </Button>
            </div>
        </Dialog>
    )
}

export default DialogAgendaViva;