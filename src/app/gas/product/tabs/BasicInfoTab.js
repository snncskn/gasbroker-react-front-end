import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { getCustomers } from "app/gas/store/customersSlice";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function BasicInfoTab(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState({
    direction: "asc",
    id: null,
  });
  const [value, setValue] = useState(customers[0]);

  useEffect(() => [dispatch]);

  return (
    <div>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.code}
            required
            helperText={errors?.code?.message}
            label="Code"
            autoFocus
            translate="PRODUCT_CODE"
            id="type"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="registered_date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            type="date"
            helperText={errors?.name?.message}
            label="Registered Date"
            autoFocus
            id="registered_date"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
