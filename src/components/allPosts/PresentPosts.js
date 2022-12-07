import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import { useAuth } from "../../contexts/AuthContext";
import PostButtons from "./PostButtons";
import PostChips from "./PostChips";

function PresentPosts({ posts }) {
  const [expanded, setExpanded] = useState([]);
  const { currentUser } = useAuth();

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
                {post.title} on {new Date(post.date).toUTCString().slice(5, 16)}
                , {new Date(post.date).toUTCString().slice(17, 22)}
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
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <PostButtons
                      post={post}
                      index={index}
                      expanded={expanded}
                      setExpanded={setExpanded}
                    />
                    <br />
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
