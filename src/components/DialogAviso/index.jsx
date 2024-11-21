import React from "react"
import { Dialog, Button, Divider } from "@mui/material"

const DialogAviso = ({ description, title, onClickSim, onClickNao, isOpen, style }) => {
    return (
        <Dialog open={isOpen}>
            <div style={{ padding: 20 }}>
                <div style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 20, fontWeight: 400 }}>{title}</div>
                    <div>{description}</div>
                </div>
                <Divider sx={{ borderBottomWidth: 1, backgroundColor: 'gray', marginTop: 2, marginBottom: 2 }}/>
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button onClick={onClickSim} variant="contained">
                        Sim
                    </Button>
                    <Button onClick={onClickNao} variant="contained" sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}>
                        Não
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default DialogAviso;