import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Ajuste o caminho conforme seu projeto
import { AuthContext } from "../../context/AuthContext";

export default function GerirUsers({ navigation }) {
  const { token } = useContext(AuthContext);

  const [usuarios, setUsuarios] = useState([]);

  async function getUsers() {
    try {
      const response = await fetch("http://192.168.0.230:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message);
        return;
      }

      setUsuarios(data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar com o servidor."
      );
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(email) {
    try {
      const response = await fetch(
        `http://192.168.0.230:3000/users/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        Alert.alert("Erro", data.message);
        return;
      }

      setUsuarios((usuariosAnteriores) =>
        usuariosAnteriores.filter(
          (usuario) => usuario.email !== email
        )
      );

      Alert.alert("Sucesso", "Usuário excluído com sucesso!");

    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar com o servidor."
      );
    }
  }

  function handleAddUser() {
    navigation.navigate("CreateUser");
  }

  async function handleDelete(email) {
  Alert.alert(
    "Excluir Usuário",
    "Deseja realmente excluir este usuário?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteUser(email)
      },
    ]
  );
}

  function renderItem({ item, index }) {
    return (
      <View style={styles.card}>
        <Text style={styles.numero}>{index + 1}º</Text>

        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nome}>{item.nome_user}</Text>

            <View style={styles.rightSide}>
              <Text style={styles.tipo}>
                {item.tipo_user}
              </Text>

              <TouchableOpacity
                onPress={() => handleDelete(item.email)}
              >
                <MaterialIcons
                  name="delete"
                  size={28}
                  color="#D32F2F"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.email}>
            {item.email}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddUser}
      >
        <View style={styles.circle}>
          <Text style={styles.plus}>+</Text>
        </View>

        <Text style={styles.addText}>
          ADICIONAR USUÁRIO
        </Text>
      </TouchableOpacity>

      <FlatList
        data={usuarios}
        keyExtractor={(item, index) =>
          item.id_user
            ? item.id_user.toString()
            : index.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  addButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    height: 100,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    marginBottom: 25,
  },

  circle: {
    width: 38,
    height: 38,

    borderRadius: 19,

    borderWidth: 3,
    borderColor: "#00D639",

    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    color: "#00D639",
    fontSize: 24,
    fontWeight: "bold",
  },

  addText: {
    flex: 1,

    textAlign: "center",

    color: "#00D639",

    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#D9D9D9",

    borderRadius: 12,

    padding: 18,

    marginBottom: 18,

    flexDirection: "row",
  },

  numero: {
    fontSize: 28,
    fontWeight: "bold",

    marginRight: 15,

    alignSelf: "center",
  },

  infoContainer: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 18,
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },

  tipo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    fontSize: 18,
    textAlign: "center",
  },
  rightSide: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  },
});