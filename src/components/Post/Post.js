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
  CardMedia,
  Typography,
  CardActions,
  FilledInput,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";

function Post(props) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  return props.posts.map((post, index) => (
    <div className="" key={index}>
      <Container maxWidth="sm" sx={{ mb: 2 }}>
        <Card>
          <CardHeader
            avatar={<Avatar>{post.userEmail[0].toUpperCase()}</Avatar>}
            action={<Chip label={post.interest} />}
            title={post.title}
            subheader={`${post.time
              .toDate()
              .toUTCString()
              .slice(5, 16)}, ${post.time
              .toDate()
              .toUTCString()
              .slice(16, 22)}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <EmailIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Text itself</Typography>
              {post.spots}
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    </div>
  ));
}

export default Post;
