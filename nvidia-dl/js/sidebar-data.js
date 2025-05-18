const chapters = [
    {
        number: 1,
        title: "神經網路的基礎知識",
        description: "了解感知器與神經網路。",
        link: "chapter1.html",
        emoji: "📗",
        subsections: [
            { title: "1.1 Rosenblatt感知器", anchor: "#perceptron-basics" },
            { title: "1.2 感知器訓練與應用", anchor: "#perceptron-training" },
            { title: "1.3 用線性代數實現神經網路模型", anchor: "#linear-algebra" }
        ],
        colabLinks: [
            {
                title: "基本感知器實作",
                url: "https://colab.research.google.com/drive/1eUbIiW9N-gyGchVV0oS0bVZjnPaFbNFT"
            },
            {
                title: "感知器學習視覺化",
                url: "https://colab.research.google.com/drive/1-kIIC4veeTfPAbsfFbrX6zZWSpCrX8Eg"
            }
        ],
    },
    {
        number: 2,
        title: "梯度下降法與反向傳播",
        description: "探索梯度下降法與反向傳播。",
        link: "chapter2.html",
        emoji: "📗",
        subsections: [
            { title: "2.1 導數的基礎概念", anchor: "#derivatives-basics" },
            { title: "2.2 梯度下降法", anchor: "#gradient-descent" },
            { title: "2.3 反向傳播", anchor: "#backpropagation" }
        ]
    },
    {
        number: 4,
        title: "卷積神經網路 (CNN)",
        description: "從 AlexNet 開始認識 CNN，到 VGGNet、GoogLeNet 與 ResNet 的演進。",
        link: "chapter4.html",
        emoji: "📗",
        colabLinks: [
            {
                title: "基礎CNN圖像分類",
                url: "https://colab.research.google.com/drive/12mTlj9RNSHixd4jJUNLKTe6Xdm5cV8T6"
            },
            {
                title: "進階CNN圖像分類",
                url: "https://colab.research.google.com/drive/1e4a5Jb4fC5ei2CLPn2SNS-2JQXgZQSaZ#scrollTo=J6wU4GhWAATY"
            },
            {
                title: "使用 ResNet50 做圖像分類",
                url: "https://colab.research.google.com/drive/16YNbZbtzD98S4K8pk2BmCDmxRgAP1jdJ#scrollTo=CximHmOEwlzE"
            }
        ],
        subsections: [
            { title: "4.1 卷積神經網路的基礎", anchor: "#cnn-basics" },
            { title: "4.2 更深層的CNN", anchor: "#deeper-cnn" },
            { title: "4.3 遷移學習與預訓練模型", anchor: "#advanced-cnn" }
        ]
    }
];
