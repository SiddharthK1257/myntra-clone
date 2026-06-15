import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function Bag() {
  const router = useRouter();
  const { user } = useAuth();

  const [bag, setBag] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://myntra-clone-pp8m.onrender.com/api/cart/${user._id}`
      );

      console.log("Bag Response:", response.data);

      if (Array.isArray(response.data)) {
        setBag(response.data);
      } else if (response.data.items) {
        setBag(response.data.items);
      } else {
        setBag([]);
      }
    } catch (error) {
      console.log(error);
      setBag([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: any) => {
    try {
      await axios.delete(
        `https://myntra-clone-pp8m.onrender.com/bag/${itemId}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const total = bag
    .filter((item: any) => !item.savedForLater)
    .reduce(
      (sum: number, item: any) =>
        sum + (item.productId?.price || 0) * item.quantity,
      0
    );

  if (!user) {
    return (
      <View style={styles.emptyState}>
        <ShoppingBag size={60} color="#ff3f6c" />
        <Text style={styles.emptyText}>Please login to view your bag</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff3f6c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
      </View>

      <ScrollView style={styles.content}>
        {bag.filter((item) => !item.savedForLater).length === 0 ? (
          <View style={styles.emptyState}>
            <ShoppingBag size={60} color="#ff3f6c" />
            <Text style={styles.emptyText}>Your bag is empty</Text>
          </View>
        ) : (
          bag
            .filter((item) => !item.savedForLater)
            .map((item: any) => (
              <View key={item._id} style={styles.bagItem}>
                <Image
                  source={{
                    uri:
                      item.productId?.images?.[0] ||
                      "https://via.placeholder.com/100",
                  }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.brand}>
                    {item.productId?.brand}
                  </Text>

                  <Text style={styles.name}>
                    {item.productId?.name}
                  </Text>

                  <Text style={styles.price}>
                    ₹{item.productId?.price}
                  </Text>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      onPress={async () => {
                        await axios.post(
                          "https://myntra-clone-pp8m.onrender.com/api/cart/decrease",
                          {
                            userId: user._id,
                            productId: item.productId._id,
                          }
                        );

                        fetchProducts();
                      }}
                    >
                      <Minus size={20} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={async () => {
                        await axios.post(
                          "https://myntra-clone-pp8m.onrender.com/api/cart/increase",
                          {
                            userId: user._id,
                            productId: item.productId._id,
                          }
                        );

                        fetchProducts();
                      }}
                    >
                      <Plus size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 20 }}
                      onPress={() => handleDelete(item._id)}
                    >
                      <Trash2 size={20} color="#ff3f6c" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={async () => {
                      await axios.post(
                        "https://myntra-clone-pp8m.onrender.com/api/cart/save",
                        {
                          userId: user._id,
                          productId: item.productId._id,
                        }
                      );

                      fetchProducts();
                    }}
                  >
                    <Text style={styles.saveText}>
                      Save For Later
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.buttonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 15,
  },

  bagItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 15,
    padding: 10,
  },

  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    paddingLeft: 15,
  },

  brand: {
    fontSize: 14,
    color: "#777",
  },

  name: {
    fontSize: 16,
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
  },

  saveText: {
    color: "#ff3f6c",
    marginTop: 15,
    fontWeight: "600",
  },

  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 15,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 16,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#ff3f6c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },
});