import { useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "@mui/system";

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

const AllPosts = () => {
  const { posts, getAllPosts, filter, filteredPosts, getFilteredPosts } = usePosts();

  const [expanded, setExpanded] = useState(false);
const [isFiltered,setIsFiltered] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const f = async () => {
      try{
        await getAllPosts();
        if(filter.location !== ""){
          await getFilteredPosts()
          setIsFiltered(true)

        }
    } catch(err){
      console.log(err);
    }
      console.log("here");
      console.log("filter",filter);
    };
    f();
  }, [filter]);


console.log("isFiltered",isFiltered);
console.log("filteredPosts",filteredPosts);
  return (filteredPosts.length > 0 && isFiltered)?( <>
    <h3>Filtered Posts</h3>
    { filteredPosts.map((post, index) => (
      <div className="post-container" key={index}>
        <p>{post.userId}</p>
        <p>{post.description}</p>
        <p>{(post.time.seconds)}</p>
      </div>
    ))}
  </>):(<>
      <h2>All Posts</h2>
      {posts.map((post, index) => (
        <div className="" key={index}>
          <Container maxWidth="sm" sx={{ mb: 2 }}>
            <Card>
              <CardHeader
                avatar={<Avatar>{post.userEmail[0].toUpperCase()}</Avatar>}
                action={<Chip label={post.interest} />}
                title="Name"
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
                  <Typography paragraph>Title:</Typography>
                  <Typography paragraph>Text itself</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Container>
        </div>
      ))}
    </>);
  
};

export default AllPosts;
