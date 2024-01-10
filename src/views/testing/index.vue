<template>
    <div>

    </div>
</template>

<script>
export default {
    setup() {
        axios
            .get("https://api.aiforthai.in.th/ssense", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Apikey: "nn6tZctdSvv8RASCk8oU62F0QWTbSB7s"
                },
                params: {
                    text: "ระวังโดนหลอก"
                }
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        // โหลด Google Maps API script
        // โหลด Google Maps API script
        const loadGoogleMapsScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry&callback=initMap`;
                script.async = true;
                script.defer = true;
                script.addEventListener("load", () => {
                    resolve();
                });
                script.addEventListener("error", () => {
                    console.error("Failed to load Google Maps API");
                    resolve(); // ให้ resolve ก็ต่อเมื่อเกิด error ด้วย
                });
                document.head.appendChild(script);
            });
        };


        return {}
    },
}
</script>

<style lang="scss" scoped></style>