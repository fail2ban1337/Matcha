import React, { useEffect, useState } from "react";
import { Cover } from "../profile/Profile";
import { Title } from "./Notifications";
import { getBrowser, filterBrowser } from "../../actions/profileAction";

import {
  Box,
  Container,
  Avatar,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  CssBaseline,
  DialogTitle,
  Slide,
  Grid,
  Fab
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import RadioGroup from "@material-ui/core/RadioGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import { useUserStore } from "../../Context/appStore";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0 auto",
    width: "125px",
    height: "125px",
    "&:hover": {
      background: "black",
      opacity: 0.8
    }
  },
  slider: {
    color: "rgb(231, 76, 60)"
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  title: {
    fontSize: "30px",
    fontWeight: "bolder",
    letterSpacing: "2px",
    display: "inline-block"
  },
  card: {
    backgroundColor: "transparent"
  },
  submit: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog = ({ open, handleClose, info, classes }) => {
  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              style={{
                backgroundColor: "#e74c3c",
                height: "70px",
                textAlign: "center"
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <div>
                    <h5
                      style={{
                        color: "#FFF"
                      }}
                    >
                      {info.first_name} {info.last_name}
                    </h5>
                    <p
                      style={{
                        display: "inline-block",
                        color: "#FFF",
                        fontSize: "24px",
                        fontWeight: "700"
                      }}
                    >
                      {info.fameRate}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <Avatar
                    src={`./uploads/${info.id}/profile.jpg`}
                    alt={info.first_name}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={4}>
                  <p style={{ textAlign: "center", fontWeight: "700" }}>
                    {info.user_birth} years old
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <p style={{ textAlign: "center", fontWeight: "700" }}>
                    {info.user_city}
                  </p>
                </Grid>
                {/* <Grid item xs={4}>
                  <p style={{ textAlign: "center", fontWeight: "700" }}>
                    {JSON.parse(inf.user_tags).map((tag, index) => {
                      if (index === 0) return tag;
                    })}
                  </p>
                </Grid> */}
                <Grid item xs={4}>
                  <p style={{ textAlign: "center", fontWeight: "700" }}>
                    {info.destination} KM
                  </p>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              style={{ justifyContent: "center", backgroundColor: "#e74c3c" }}
            >
              <Fab style={{ color: "#e74c3c" }}>
                <ThumbUpAltIcon />
              </Fab>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [{ profile }] = useUserStore();

  const [showCard, setShowCard] = React.useState({
    myinfo: {}
  });

  const handleClickOpen = e => {
    setShowCard({
      showCard: e
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {profile.browser.result.map(inf => {
        return (
          <Box key={inf.id} style={{ margin: "0 4%" }} flexGrow={1}>
            <Avatar
              src={`./uploads/${inf.id}/profile.jpg`}
              alt={inf.first_name}
              className={classes.avatar}
              onClick={() => handleClickOpen(inf)}
            />
            <h5 style={{ textAlign: "center" }}>
              {inf.first_name} {inf.last_name}
            </h5>
            <p style={{ textAlign: "center" }}>{inf.user_birth} years old</p>
            <ProfileDialog
              open={open}
              handleClose={handleClose}
              info={showCard.showCard}
              classes={classes}
            />
          </Box>
        );
      })}
    </>
  );
};

const ProfilesContainer = ({ children }) => {
  return (
    <>
      <Grid
        xs={12}
        container
        item
        justify="center"
        style={{ paddingTop: "20px" }}
      >
        <Typography variant="subtitle1">Members</Typography>
      </Grid>
      <Grid xs={12} container item justify="center">
        <img src={"img/underTitleLine.png"} alt="wrap" />
      </Grid>

      <Box display="flex" flexWrap="wrap" alignItems="center" pt={5}>
        {children}
      </Box>
    </>
  );
};
const Sort = () => {
  const classes = useStyles();
  const [sort, setSort] = useState({
    sort_by: ""
  });
  const [{ profile }, dispatch] = useUserStore();
  console.log(profile);

  const handleChange = event => {
    console.log("test");
    setSort({
      ...sort,
      [event.target.name]: event.target.value
    });
  };
  return (
    <Card style={{ backgroundColor: "transparent" }}>
      <CardContent style={{ height: "164px" }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid xs={12} container item justify="center">
            <Typography variant="overline" gutterBottom>
              <img
                src="./img/widget-title-border.png"
                alt="left"
                style={{ color: "rgb(231, 76, 60)" }}
              />
              {" Sort By "}
              <img
                src="./img/widget-title-border.png"
                alt="left"
                style={{ color: "rgb(231, 76, 60)", transform: "scaleX(-1)" }}
              />
            </Typography>
          </Grid>
          <Divider className={classes.divider} />

          <Grid item xs={12}>
            <FormControl component="fieldset" style={{ display: "block" }}>
              <RadioGroup
                row
                aria-label="gender"
                name="user_gender_interest"
                style={{ justifyContent: "center" }}
                name="sort_by"
                onChange={handleChange}
                value={
                  profile.browser.sort_by
                    ? profile.browser.sort_by
                    : sort.sort_by
                }
              >
                <FormControlLabel
                  value="Age"
                  control={<Radio color="secondary" />}
                  label="Age"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="location"
                  control={<Radio color="secondary" />}
                  label="location"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="fame rating"
                  control={<Radio color="secondary" />}
                  label="fame rating"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
};
function valuetext(value) {
  return `${value}`;
}

const Filter = () => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState({
    age_range: [16, 80],
    location_range: 5000,
    fame_rating: 1
  });
  const [{ profile }, dispatch] = useUserStore();
  const submitForm = form => {
    form.preventDefault();
    async function filterFunc() {
      await filterBrowser(filter, dispatch);
    }
    filterFunc();
  };

  const handleChange = name => (event, newValue) => {
    setFilter({
      ...filter,
      [name]: newValue
    });
  };
  console.log();
  return (
    <form className={classes.form} onSubmit={form => submitForm(form)}>
      <Card style={{ backgroundColor: "transparent" }}>
        <CardContent
          style={{
            paddingBottom: 10
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid xs={12} container item justify="center">
              <Typography variant="overline" gutterBottom>
                <img
                  src="./img/widget-title-border.png"
                  alt="left"
                  style={{ color: "rgb(231, 76, 60)" }}
                />
                {" Filter "}
                <img
                  src="./img/widget-title-border.png"
                  alt="left"
                  style={{ color: "rgb(231, 76, 60)", transform: "scaleX(-1)" }}
                />
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid xs={12} container item justify="center">
                <Typography variant="overline" id="range-slider" gutterBottom>
                  Age range
                </Typography>
              </Grid>

              <Slider
                className={classes.slider}
                max={80}
                min={16}
                step={1}
                value={filter.age_range}
                onChange={handleChange("age_range")}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid xs={12} container item justify="center">
                <Typography variant="overline" id="range-slider" gutterBottom>
                  Location Range
                </Typography>
              </Grid>

              <Slider
                className={classes.slider}
                value={filter.location_range}
                max={5000}
                step={1}
                onChange={handleChange("location_range")}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider-always"
                getAriaValueText={valuetext}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid xs={12} container item justify="center">
                <Typography variant="overline" id="range-slider" gutterBottom>
                  fame rating
                </Typography>
              </Grid>
              <Grid xs={12} container item justify="center">
                <Rating
                  name="simple-controlled"
                  value={filter.fame_rating}
                  onChange={handleChange("fame_rating")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} container item justify="center">
            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Filter
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Cover img={"/img/banner-brwose.jpg"}>
        <Grid xs={12} container item justify="center">
          <div>
            <Typography
              variant="h5"
              id="range-slider"
              gutterBottom
              classes={classes.title}
            >
              <img src="./img/t-left-img.png" alt="left" />
              Browse
              <img src="./img/t-right-img.png" alt="right" />
            </Typography>
          </div>
        </Grid>
      </Cover>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        style={{ marginTop: "-5%" }}
      >
        <Grid item xs={12} md={6}>
          <Filter />
        </Grid>
        <Grid item xs={12} md={6}>
          <Sort />
        </Grid>
      </Grid>
    </>
  );
};

const Browse = () => {
  const [{ profile }, dispatch] = useUserStore();
  console.log(profile);
  useEffect(() => {
    async function test() {
      await getBrowser(dispatch);
    }
    test();
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header />
      <Container>
        <ProfilesContainer>
          <Profile />
        </ProfilesContainer>
      </Container>
    </div>
  );
};

export default Browse;
