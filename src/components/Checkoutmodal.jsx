import axios from "axios";

const checkout = async (formData) => {
  try {
    if (!formData) {
      throw new Error("Form data is undefined");
    }

    const biodata = {
      ...formData,
      item_id: formData.item_id,
    };

    // console.log("✅ Checkout Data:", biodata);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 1. Simpan biodata ke database (Sebelum ke Midtrans)
    try {
      const biodataResponse = await axios.post(
        "http://creativemusichub.com/api/biodata.php",
        biodata,
        config
      );
      console.log("✅ Biodata saved successfully:", biodataResponse.data);
    } catch (biodataError) {
      console.error("❌ Error saving biodata:", biodataError);
      alert("Gagal menyimpan data biodata. Silakan coba lagi.");
      return false; // Mengembalikan false jika gagal
    }

    // 2. Lanjutkan ke Midtrans
    const paymentData = {
      id: formData.id,
      productName: formData.item,
      price: formData.price,
    };

    const midtransResponse = await axios.post(
      "http://creativemusichub.com/api/payments/process-transaction",
      paymentData,
      config
    );

    console.log("✅ Midtrans Response:", midtransResponse.data);

    const token = midtransResponse.data.token;

    // Tampilkan popup Midtrans (tanpa menunggu hasil)
    if (window.snap) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment Success:", result);
          alert("Payment Successful!");
          window.location.href = "/";
        },
        onPending: (result) => {
          console.log("Payment Pending:", result);
          alert("Payment Pending. Please complete the transaction.");
        },
        onError: (result) => {
          console.log("Payment Failed:", result);
          alert("Payment Failed. Please try again.");
        },
        onClose: () => {
          console.log("Payment Popup Closed");
          alert("Payment popup closed without completing the transaction.");
        },
      });
    } else {
      console.error("Midtrans Snap is not loaded");
      alert("Midtrans Snap is not loaded. Please check your script.");
    }

    return true; // Mengembalikan true setelah biodata disimpan dan popup ditampilkan
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Checkout failed. Please try again.");
    return false;
  }
};

export { checkout };
