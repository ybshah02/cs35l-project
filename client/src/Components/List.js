import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton'
import './List.css'
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MyList = (props) => {
    const { data } = props;
    const renderItems = () => {
        console.log(data)
        if (data) {
            return data.map(each => {
                console.log(each)
                return (<ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonOutlineIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={each}
                    />
                </ListItem>
                );
            })
        } else {
            return (
            <ListItem>
                <ListItemText
                primary="No team members exist.">
                </ListItemText>
            </ListItem>
            );
        }

        return null
    }

    return (
        <div className="ListContainer">
            <Typography variant="h4" gutterBottom component="div">
                Team Members
            </Typography>
            <List sx={{ width: '100%' }}>
                {renderItems()}
            </List>
        </div>
    )
}
export default MyList