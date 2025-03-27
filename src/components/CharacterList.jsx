import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;

const CharacterList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      status: statusFilter || null,
      species: speciesFilter || null,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.characters && data.characters.results) {
      setAllCharacters((prev) =>
        page === 1 ? data.characters.results : [...prev, ...data.characters.results]
      );
    }
  }, [data, page]);

  const sortedResults = [...allCharacters];
  if (sortField === "name") {
    sortedResults.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortField === "origin") {
    sortedResults.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
  }

  useEffect(() => {
    setPage(1);
    setAllCharacters([]);
    refetch({
      page: 1,
      status: statusFilter || null,
      species: speciesFilter || null,
    });
  }, [statusFilter, speciesFilter, refetch]);

  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && data && data.characters.info.next) {
      const nextPage = page + 1;
      fetchMore({
        variables: {
          page: nextPage,
          status: statusFilter || null,
          species: speciesFilter || null,
        },
      });
      setPage(nextPage);
    }
  }, [inView, data, fetchMore, page, statusFilter, speciesFilter]);

  return (
    <Box>
      {/* Filter / Sort Section */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>{t("status")}</InputLabel>
              <Select
                value={statusFilter}
                label={t("status")}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">{t("all")}</MenuItem>
                <MenuItem value="Alive">{t("alive")}</MenuItem>
                <MenuItem value="Dead">{t("dead")}</MenuItem>
                <MenuItem value="unknown">{t("unknown")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>{t("species")}</InputLabel>
              <Select
                value={speciesFilter}
                label={t("species")}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                <MenuItem value="">{t("all")}</MenuItem>
                <MenuItem value="Human">{t("human")}</MenuItem>
                <MenuItem value="Alien">{t("alien")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>{t("sortBy")}</InputLabel>
              <Select
                value={sortField}
                label={t("sortBy")}
                onChange={(e) => setSortField(e.target.value)}
              >
                <MenuItem value="">{t("none")}</MenuItem>
                <MenuItem value="name">{t("name")}</MenuItem>
                <MenuItem value="origin">{t("origin")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={4}>
        {sortedResults.map((char) => (
          <Grid item xs={12} sm={6} md={4} key={char.id}>
            <Card sx={{ height: 400, display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: "cover" }}
                image={char.image}
                alt={char.name}
              />
              <CardContent>
                <Typography variant="h6">{char.name}</Typography>
                <Typography variant="body2">
                  {t("status")}: {char.status}
                </Typography>
                <Typography variant="body2">
                  {t("species")}: {char.species}
                </Typography>
                <Typography variant="body2">
                  {t("gender")}: {char.gender}
                </Typography>
                <Typography variant="body2">
                  {t("origin")}: {char.origin.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box ref={sentinelRef} sx={{ height: "20px", mt: 4, textAlign: "center" }}>
        {loading && <CircularProgress />}
      </Box>
      {error && (
        <Box sx={{ mt: 4, textAlign: "center", color: "red" }}>
          {t("error")}
        </Box>
      )}
    </Box>
  );
};

export default CharacterList;
