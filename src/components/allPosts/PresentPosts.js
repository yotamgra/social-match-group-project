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
  Box,
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
import PostButtons from "./PostButtons";
import PostChips from "./PostChips";

function PresentPosts({ posts }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState([]);
  const { currentUser } = useAuth();
  const {
    deleteUserPost,
    setChangeInPosts,
    changeInPost,
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

  // useEffect(() => {}, [posts, changeInPost]);

  return posts.map((post, index) => {
    expanded.push(false);
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!expanded[index] ? (
                <PostButtons
                  post={post}
                  index={index}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              ) : (
                <></>
              )}
              <ExpandMore
                expand={expanded[index]}
                sx={{ float: "right" }}
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
            </Box>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{post.description}</Typography>
              </CardContent>
              {currentUser.uid === post.user.userId && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { sm: "space-between", xs: "center" },
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {expanded[index] ? (
                      <>
                        <PostButtons
                          post={post}
                          index={index}
                          expanded={expanded}
                          setExpanded={setExpanded}
                        />
                        <PostChips post={post} />
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </>
              )}{" "}
              {expanded[index] && currentUser.uid !== post.user.userId ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { sm: "space-between", xs: "center" },
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <PostButtons
                      post={post}
                      index={index}
                      expanded={expanded}
                      setExpanded={setExpanded}
                    />
                    <PostChips post={post} />
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Collapse>
          </Card>
        </Container>
      </div>
    );
  });
}

export default PresentPosts;

{
  /* <PostButtons post={post} index={index} expanded={expanded} setExpanded={setExpanded} /> */
}

// sx={{display: "flex", flexDirection: "row"}}
