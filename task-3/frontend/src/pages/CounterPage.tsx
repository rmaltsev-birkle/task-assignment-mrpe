import { useUser } from "@/hooks/use-user";
import { useGetCountersQuery, useUpsertCounterMutation } from "@/slices/counter-api-slice";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function CounterPage() {
  const user = useUser();
  const {
    isLoading: isFetchingLoading,
    isError: isFetchingError,
    error: fetchError,
    data: counterValue,
  } = useGetCountersQuery({ userId: user?.id });
  const [
    upsertCounter,
    { isLoading: isUpsertingCounter, isError: isUpsertingError, error: upsertError },
  ] = useUpsertCounterMutation();
  const value = counterValue?.[0]?.value ?? 0;
  const id = counterValue?.[0]?.id ?? undefined;
  const isLoading = isFetchingLoading || isUpsertingCounter;
  const isError = isFetchingError || isUpsertingError;
  const error = JSON.stringify(fetchError || upsertError);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Card variant="elevation" sx={{ maxWidth: { sm: 384, xs: "100%" }, width: "100%" }}>
        <CardHeader title="Counter" />
        <CardContent>
          <Stack spacing={4}>
            {isError ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              value={value}
              contentEditable={false}
              fullWidth
              disabled={isLoading}
              error={isError}
              label="Counter"
              variant="outlined"
              name="counter"
              type="text"
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <Button
              onClick={() => upsertCounter({ value: value + 1, id: id })}
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              +1
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
