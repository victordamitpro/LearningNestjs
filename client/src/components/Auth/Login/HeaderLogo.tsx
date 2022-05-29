import { Box, Typography } from '@material-ui/core';
import commonStyle from '../Styles/Style';
import { Colors } from '../../../enums/ColorEnum';

interface HeaderLogoProps {
  caption: string;
  title: string;
  logoClass?: string;
  textClass?: string;
}
function HeaderLogo({ caption, title, logoClass, textClass }: HeaderLogoProps) {
  const classnames = commonStyle();
  return (
    <>
      <div className={`${logoClass} ${classnames.header}`.trim()}>
        <img
          className={classnames.imgHeader}
          src="https://viact.net/logo-color.1ab1dfe3.svg"
          alt="logo color"
        />
        <Typography className={classnames.textColorSecondary}>
          Automate
          <br />
          Construction
          <br />
          Monitoring
        </Typography>
      </div>
      <Box textAlign="center" marginTop="10px" className={textClass}>
        <Typography className="caption" style={{ textTransform: 'uppercase' }}>
          {caption}
        </Typography>
        <Typography
          className="title"
          style={{
            color: Colors.Orange,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
}
export default HeaderLogo;
