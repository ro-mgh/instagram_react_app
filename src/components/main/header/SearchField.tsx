import React, { useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    paperDropdown: {
      "margin-top": "13.2px",
      width: "230px",
      padding: "0",
      "border- radius": "6px",
      opacity: 1,
    },
    menuDropdown: {
      maxHeight: 250,
      position: "relative",
      overflow: "auto",
    },
    text: {
      "font-family":
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      "font-size": "14px",
    },
    link: {
      color: "rgba(var(--i1d, 38, 38, 38), 1)",
    },
  })
);

const SearchField = () => {
  const [users, setUsers] = useState([]);
  const allUsersFromStore = useSelector((state) => state.dataReducer.users);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // finding match by name or username in all users
  useEffect(() => {
    const usersArr = Object.values(allUsersFromStore);

    if (usersArr.length) {
      const usersMatched = usersArr.filter(
        (user: { username: string; name: string }) => {
          if ("username" in user && "name" in user) {
            return user.username.includes(search) || user.name.includes(search);
          }
        }
      );

      setUsers(usersMatched);
    }
  }, [search]);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorEl && anchorEl.contains(event.target as HTMLElement)) {
      return;
    }
    setSearch("");
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className="header-search-placeholder">
      <input
        className="header-search-input"
        type="text"
        autoCapitalize="none"
        placeholder="Search"
        onChange={(e) => {
          setAnchorEl(e.currentTarget);
          setSearch(e.target.value);
        }}
        value={search}
      ></input>
      <div className={classes.root}>
        <div>
          <Popper
            open={!!search}
            anchorEl={anchorEl}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper className={classes.paperDropdown}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                      className={classes.menuDropdown}
                    >
                      {users.length ? (
                        users.map((user) => {
                          return (
                            <MenuItem
                              onClick={handleClose}
                              className={classes.text}
                              key={user.id}
                            >
                              <div className="search-user-wrapper">
                                <Link
                                  to={"/profile/" + user.id}
                                  className={classes.link}
                                >
                                  <div className="sidebar-user user-container">
                                    <div className="sidebar-user-avatar">
                                      <Avatar
                                        alt="A"
                                        src={user.avatar}
                                        className={classes.small}
                                      />
                                    </div>
                                    <div className="sidebar-user-wrapper">
                                      <div className="username-font">
                                        {user.username}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem className={classes.text}>
                          <div className="search-nofound-wrapper">
                            no users found
                          </div>
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
