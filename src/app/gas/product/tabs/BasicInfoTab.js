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

  useEffect(() => {
    dispatch(getCustomers()).then((data) => {
      setLoading(false);
      setCustomers(data.payload);
    });
  }, [dispatch]);

  return (
    <div>
      <Controller
        name="company_id"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            className="mt-8 mb-16"
            freeSolo
            options={customers}
            value={value}
            getOptionLabel={(label) => {
              return label.name;
            }}
            onChange={(event, newValue) => {
              setValue(newValue.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select company"
                label="Company"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
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
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="type"
            autoFocus
            id="type"
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
