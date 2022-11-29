import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Avatar,
  IconButton,
  CardMedia,
  Typography,
  CardActions,
  FilledInput,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/system";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { useNavigate } from "react-router-dom";

function PresentPosts({ posts }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState([]);
  const { currentUser } = useAuth();
  const {
    deleteUserPost,
    setChangeInPosts,
    setEditor,
    setEditForm,
    editUserPost,
  } = usePosts();

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  useEffect(() => {}, [posts]);

  return posts.map((post, index) => {
    expanded.push(false);
    console.log(currentUser.uid === post.user.userId);
    return (
      <div className="" key={index}>
        <Container maxWidth="sm" sx={{ mb: 2 }}>
          <Card>
            <CardHeader
              avatar={<Avatar>{post.user.name[0].toUpperCase()}</Avatar>}
              action={<Chip color="warning" label={post.city} />}
              title={
                <Typography sx={{ fontWeight: 600 }}>
                  {post.user.name.charAt(0).toUpperCase() +
                    post.user.name.slice(1)}
                </Typography>
              }
              subheader={`${post.publishTime
                .toDate()
                .toUTCString()
                .slice(5, 16)}, ${post.publishTime
                .toDate()
                .toTimeString()
                .slice(0, 5)}`}
            />
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary">
                {post.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <EmailIcon />
              </IconButton>

              {currentUser.uid !== post.user.userId && (
                <IconButton
                  onClick={() => {
                    const participantsTempArray = [...post.participants];
                    participantsTempArray.push(currentUser.uid);
                    editUserPost({
                      ...post,
                      participants: [...participantsTempArray],
                    });
                  }}
                >
                  <AddIcon /> Apply
                </IconButton>
              )}
              <ExpandMore
                expand={expanded[index]}
                onClick={() => {
                  const array = [...expanded];
                  array[index] = !array[index];
                  setExpanded(array);
                }}
                aria-expanded={expanded[index]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{post.description}</Typography>
              </CardContent>
              {currentUser.uid === post.user.userId && (
                <>
                  <Tooltip title="Delete" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteUserPost(post.id);

                        setChangeInPosts(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="top">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setChangeInPosts(true);
                        setEditor(true);
                        setEditForm({ ...post });
                        navigate("/new-post");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Chip variant="outlined" sx={{ mr: 1 }} label={post.level} />
                  <Chip
                    color="warning"
                    variant="outlined"
                    label={post.interest}
                  />
                </>
              )}
            </Collapse>
          </Card>
        </Container>
      </div>
    );
  });
}

export default PresentPosts;
