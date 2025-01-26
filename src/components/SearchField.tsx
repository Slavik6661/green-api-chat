import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  sx?: object;
}

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Поиск...",
  onSearch,
  sx = {},
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); // Вызываем функцию поиска
  };

  const handleClear = () => {
    setQuery(""); // Очищаем поле
    onSearch(""); // Вызываем поиск с пустым запросом
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch(); // Выполняем поиск при нажатии Enter
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#fff" }} /> {/* Иконка поиска */}
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} sx={{ color: "#fff" }}>
                <ClearIcon /> {/* Иконка очистки */}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            color: "#fff", // Цвет текста
            "& .MuiInputLabel-root": {
              color: "#fff", // Цвет метки
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff", // Цвет границы
              },
              "&:hover fieldset": {
                borderColor: "#fff", // Цвет границы при наведении
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff", // Цвет границы при фокусе
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff", // Цвет текста
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#ccc", // Цвет placeholder
              opacity: 1,
            },
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Полупрозрачный фон
          },
        }}
      />
    </Box>
  );
};

export default SearchField;
