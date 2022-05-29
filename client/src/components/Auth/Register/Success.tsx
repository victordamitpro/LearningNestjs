import { Box, Button, Card, CardContent, Dialog } from '@material-ui/core';
import { PropsWithChildren } from 'react';
import styles from '../Styles/Style';
import HeaderLogo from '../Login/HeaderLogo';
import { Colors } from '../../../enums/ColorEnum';

interface SuccessProps {
  visible: boolean;
  onClose: () => void;
  caption: string;
  title: string;
  primaryActionText?: string;
  primaryActionHandle?: () => void;
  secondaryActionText?: string;
  secondaryActionHandle?: () => void;
}
function Success({
  visible,
  onClose,
  caption,
  title,
  primaryActionHandle,
  primaryActionText,
  secondaryActionText,
  children,
}: PropsWithChildren<SuccessProps>) {
  const classnames = styles();
  return (
    <Dialog
      scroll="body"
      open={visible}
      onClose={onClose}
      PaperProps={{
        className: classnames.dialog,
      }}
    >
      <Card style={{ borderRadius: 20 }}>
        <CardContent>
          <Box padding="20px">
            <HeaderLogo
              title={title}
              caption={caption}
              logoClass={classnames.successTextColorSecondary}
              textClass={classnames.successTitle}
            />
          </Box>
          <Box padding="0 20px 20px">{children}</Box>
          <Box
            textAlign="center"
            display="flex"
            alignItems="center"
            flexDirection="column"
            padding="0 20px"
          >
            <Button
              variant="contained"
              className={classnames.successBtn}
              onClick={primaryActionHandle}
            >
              {primaryActionText ?? 'i got it'}
            </Button>
            <Button
              variant="text"
              style={{
                textTransform: 'uppercase',
                textDecoration: 'underline',
                marginTop: 20,
                color: Colors.Gray,
              }}
              onClick={() => window.open('https://viact.net/', '_self')}
            >
              {secondaryActionText ?? 'back to home'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
}
export default Success;
