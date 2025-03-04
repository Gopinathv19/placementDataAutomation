import PropTypes from 'prop-types'
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVertOutlined"

const Common = ({ 
  title, 
  onMenuClick, 
  menuAnchorEl, 
  onMenuClose,
  onSortAsc,
  onSortDesc 
}) => {
  return (
    <div className='cardHeading'>
      <h3>{title}</h3>
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={onMenuClick}
        className='headingIcon'
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onSortAsc}>Sort (Low to High)</MenuItem>
        <MenuItem onClick={onSortDesc}>Sort (High to Low)</MenuItem>
      </Menu>
    </div>
  )
}

Common.propTypes = {
  title: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  menuAnchorEl: PropTypes.object,
  onMenuClose: PropTypes.func.isRequired,
  onSortAsc: PropTypes.func.isRequired,
  onSortDesc: PropTypes.func.isRequired
}

export default Common