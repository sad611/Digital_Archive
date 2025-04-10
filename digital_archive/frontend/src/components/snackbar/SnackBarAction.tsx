import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface SnackBarActionProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  content: string;
}

const SnackBarAction: React.FC<SnackBarActionProps> = ({
  type,
  title,
  content,
}) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircleOutline color="success" />;
      case "error":
        return <ErrorOutline color="error" />;
      case "warning":
        return <WarningAmberOutlined color="warning" />;
      case "info":
      default:
        return <InfoOutlined color="info" />;
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {getIcon(type)}
      <div>
        <Typography variant="subtitle2" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </div>
    </Box>
  );
};

export default SnackBarAction;
