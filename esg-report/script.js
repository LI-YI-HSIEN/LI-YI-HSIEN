document.addEventListener('DOMContentLoaded', function () {
    // 表單頁面切換
    const pages = document.querySelectorAll('.form-page');
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const generateBtn = document.getElementById('generate-report');

    // 條件相關欄位顯示控制
    const externalVerificationSelect = document.getElementById('externalVerification');
    const verificationDetails = document.querySelector('.verification-details');

    // 當前頁面索引
    let currentPage = 0;

    // 初始化頁面
    function initFormPages() {
        pages.forEach((page, index) => {
            if (index === currentPage) {
                page.classList.add('active');
                steps[index].classList.add('active');
            } else {
                page.classList.remove('active');
                steps[index].classList.remove('active');
            }
        });
    }

    // 顯示下一頁
    function showNextPage() {
        if (validateCurrentPage()) {
            pages[currentPage].classList.remove('active');
            steps[currentPage].classList.add('completed');
            steps[currentPage].classList.remove('active');

            currentPage++;

            pages[currentPage].classList.add('active');
            steps[currentPage].classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 顯示上一頁
    function showPrevPage() {
        pages[currentPage].classList.remove('active');
        steps[currentPage].classList.remove('active');

        currentPage--;

        pages[currentPage].classList.add('active');
        steps[currentPage].classList.add('active');
        steps[currentPage].classList.remove('completed');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 驗證當前頁面
    function validateCurrentPage() {
        const currentInputs = pages[currentPage].querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        currentInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');

                // 如果尚未添加錯誤訊息，則添加
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.textContent = '此欄位為必填';
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = 'red';
                    errorMessage.style.fontSize = '0.8rem';
                    errorMessage.style.marginTop = '5px';
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
            } else {
                input.classList.remove('error');

                // 移除錯誤訊息
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.parentNode.removeChild(input.nextElementSibling);
                }
            }
        });

        return isValid;
    }

    // 外部查證顯示控制
    if (externalVerificationSelect) {
        externalVerificationSelect.addEventListener('change', function () {
            if (this.value === 'yes') {
                verificationDetails.style.display = 'block';
            } else {
                verificationDetails.style.display = 'none';
            }
        });
    }

    // 下一頁按鈕點擊事件
    nextBtns.forEach(btn => {
        btn.addEventListener('click', showNextPage);
    });

    // 上一頁按鈕點擊事件
    prevBtns.forEach(btn => {
        btn.addEventListener('click', showPrevPage);
    });

    // 動態新增里程碑
    const addMilestoneBtn = document.getElementById('add-milestone');
    const milestonesContainer = document.getElementById('milestones-container');

    if (addMilestoneBtn && milestonesContainer) {
        addMilestoneBtn.addEventListener('click', function () {
            const milestoneEntry = document.createElement('div');
            milestoneEntry.classList.add('milestone-entry');

            milestoneEntry.innerHTML = `
                <input type="number" name="milestoneYear[]" placeholder="年份" min="1900" max="2023">
                <input type="text" name="milestoneDesc[]" placeholder="事件描述">
                <button type="button" class="remove-btn">移除</button>
            `;

            milestonesContainer.appendChild(milestoneEntry);

            // 顯示第一個項目的移除按鈕
            if (milestonesContainer.children.length > 1) {
                milestonesContainer.querySelector('.remove-btn').style.display = 'block';
            }

            // 為新增的移除按鈕添加事件
            milestoneEntry.querySelector('.remove-btn').addEventListener('click', function () {
                milestonesContainer.removeChild(milestoneEntry);

                // 如果只剩一個項目，隱藏移除按鈕
                if (milestonesContainer.children.length === 1) {
                    milestonesContainer.querySelector('.remove-btn').style.display = 'none';
                }
            });
        });
    }

    // 動態新增核心價值
    const addValueBtn = document.getElementById('add-value');
    const valuesContainer = document.getElementById('values-container');

    if (addValueBtn && valuesContainer) {
        addValueBtn.addEventListener('click', function () {
            const valueEntry = document.createElement('div');
            valueEntry.classList.add('value-entry');

            valueEntry.innerHTML = `
                <input type="text" name="valueTitle[]" placeholder="標題" required>
                <textarea name="valueDesc[]" placeholder="簡短說明" rows="2"></textarea>
                <button type="button" class="remove-btn">移除</button>
            `;

            valuesContainer.appendChild(valueEntry);

            // 顯示第一個項目的移除按鈕
            if (valuesContainer.children.length > 1) {
                valuesContainer.querySelector('.remove-btn').style.display = 'block';
            }

            // 為新增的移除按鈕添加事件
            valueEntry.querySelector('.remove-btn').addEventListener('click', function () {
                valuesContainer.removeChild(valueEntry);

                // 如果只剩一個項目，隱藏移除按鈕
                if (valuesContainer.children.length === 1) {
                    valuesContainer.querySelector('.remove-btn').style.display = 'none';
                }
            });
        });
    }

    // 以下是其他動態新增項目的實現（數位醫療成就、醫療品質認證等）
    // 採用函數來處理相似的邏輯

    function setupDynamicAddition(addBtnId, containerId) {
        const addBtn = document.getElementById(addBtnId);
        const container = document.getElementById(containerId);

        if (!addBtn || !container) return;

        addBtn.addEventListener('click', function () {
            // 複製第一個元素並清空輸入值
            const firstEntry = container.children[0];
            const newEntry = firstEntry.cloneNode(true);
            const inputs = newEntry.querySelectorAll('input, textarea');
            inputs.forEach(input => input.value = '');

            // 顯示移除按鈕
            const removeBtn = newEntry.querySelector('.remove-btn');
            removeBtn.style.display = 'block';

            // 添加新項目
            container.appendChild(newEntry);

            // 顯示第一個項目的移除按鈕
            if (container.children.length > 1) {
                container.querySelector('.remove-btn').style.display = 'block';
            }

            // 為新增的移除按鈕添加事件
            removeBtn.addEventListener('click', function () {
                container.removeChild(newEntry);

                // 如果只剩一個項目，隱藏移除按鈕
                if (container.children.length === 1) {
                    container.querySelector('.remove-btn').style.display = 'none';
                }
            });
        });
    }

    // 設置所有動態新增項目
    setupDynamicAddition('add-digital-achievement', 'digital-achievements-container');
    setupDynamicAddition('add-certification', 'quality-certifications-container');
    setupDynamicAddition('add-innovation', 'innovation-results-container');
    setupDynamicAddition('add-award', 'other-awards-container');
    setupDynamicAddition('add-committee', 'committee-categories-container');
    setupDynamicAddition('add-collaboration', 'collaborations-container');
    // 設置外部協會參與的動態添加
    setupDynamicAddition('add-association', 'associations-container');

    // 生成關鍵資訊摘要的函數
    // 生成關鍵資訊摘要的函數
    // 生成關鍵資訊摘要的函數
    function generateKeyInfoReport(data) {
        let report = '';

        // 【報告書基本資訊】部分
        report += '【報告書基本資訊 (GRI 2-3)】\n';

        // 報導期間
        if (data.reportPeriodStart && data.reportPeriodEnd) {
            const startDate = new Date(data.reportPeriodStart);
            const endDate = new Date(data.reportPeriodEnd);

            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1;
            const startDay = startDate.getDate();

            const endYear = endDate.getFullYear();
            const endMonth = endDate.getMonth() + 1;
            const endDay = endDate.getDate();

            report += `- 報導期間：${startYear}年${startMonth}月${startDay}日至${endYear}年${endMonth}月${endDay}日\n`;
        }

        // 發行次數和頻率
        if (data.issueNumber) {
            let frequencyText = '';
            if (data.frequency) {
                const frequencyMap = {
                    'annually': '每年一次',
                    'biannually': '每兩年一次',
                    'triennially': '每三年一次',
                    'undecided': '尚未決定發行頻率'
                };
                frequencyText = frequencyMap[data.frequency] || '';
            }

            report += `- 發行次數：第${data.issueNumber}次自願性發行`;
            if (frequencyText) {
                report += `，預計${frequencyText}`;
            }
            report += '\n';
        }

        // 標準依循
        if (data.standards && Array.isArray(data.standards) && data.standards.length) {
            let standardsText = data.standards.join('、');
            if (data.otherStandard) {
                standardsText += `、${data.otherStandard}`;
            }
            report += `- 標準依循：${standardsText}\n`;
        }

        // 外部查證
        if (data.externalVerification) {
            report += `- 外部查證 (GRI 2-5)：`;
            if (data.externalVerification === 'yes') {
                report += `${data.verificationOrg || '已委託外部單位查證'}`;
                if (data.verificationStandard) {
                    report += `，符合${data.verificationStandard}標準`;
                }
            } else if (data.externalVerification === 'no') {
                report += '未委託外部單位查證';
            } else if (data.externalVerification === 'planning') {
                report += '規劃中';
            }
            report += '\n';
        }

        // 【醫院歷史與概況】部分
        report += '\n【醫院歷史與概況 (GRI 2-1)】\n';

        // 醫院名稱
        if (data.hospitalName) {
            report += `- 醫院名稱 (GRI 2-1.a.i)：${data.hospitalName}\n`;
        }

        // 成立年份
        if (data.foundingYear) {
            report += `- 成立年份：${data.foundingYear}年籌建`;
            if (data.openingYear) {
                report += `，${data.openingYear}年啟用`;
            }
            report += '\n';
        }

        // 重要里程碑
        if (data.milestoneYear && Array.isArray(data.milestoneYear) && data.milestoneYear.length > 0) {
            let milestones = [];
            for (let i = 0; i < data.milestoneYear.length; i++) {
                if (data.milestoneYear[i] && data.milestoneDesc && data.milestoneDesc[i]) {
                    milestones.push(`${data.milestoneYear[i]}年${data.milestoneDesc[i]}`);
                }
            }

            if (milestones.length > 0) {
                report += `- 重要里程碑：${milestones.join('、')}\n`;
            }
        }

        // 升格醫學中心
        if (data.medicalCenterYear) {
            report += `- 升格醫學中心：${data.medicalCenterYear}年\n`;
        }

        // 員工數
        if (data.employeeCount) {
            report += `- 員工數 (GRI 2-7)：${data.employeeCount}人\n`;
        }

        // 病床數
        if (data.bedCount) {
            report += `- 病床數 (HC-DY-000.A)：${data.bedCount}床\n`;
        }

        // 床位細分
        let bedTypes = [];
        if (data.generalBeds) bedTypes.push(`一般病床${data.generalBeds}床`);
        if (data.icuBeds) bedTypes.push(`加護病床${data.icuBeds}床`);
        if (data.isolationBeds) bedTypes.push(`隔離病床${data.isolationBeds}床`);
        if (data.hospiceBeds) bedTypes.push(`安寧病床${data.hospiceBeds}床`);

        if (bedTypes.length > 0) {
            report += `- 床位細分 (HC-DY-000.A)：${bedTypes.join('、')}\n`;
        }

        // 年度服務量
        let serviceStats = [];
        if (data.outpatientCount) serviceStats.push(`門診約${data.outpatientCount}人次`);
        if (data.emergencyCount) serviceStats.push(`急診約${data.emergencyCount}人次`);
        if (data.inpatientCount) serviceStats.push(`住院約${data.inpatientCount}人次`);
        if (data.surgeryCount) serviceStats.push(`手術約${data.surgeryCount}人次`);

        if (serviceStats.length > 0) {
            report += `- 年度服務量 (HC-DY-000.B)：${serviceStats.join('，')}\n`;
        }

        // 【醫院使命、願景與價值觀】部分
        report += '\n【醫院使命、願景與價值觀 (GRI 2-12)】\n';

        // 宗旨/使命
        if (data.mission) {
            report += `- 宗旨：${data.mission}\n`;
        }

        // 願景
        if (data.vision) {
            report += `- 願景：${data.vision}\n`;
        }

        // 核心價值觀
        if (data.valueTitle && Array.isArray(data.valueTitle) && data.valueTitle.length > 0) {
            let values = [];
            for (let i = 0; i < data.valueTitle.length; i++) {
                if (data.valueTitle[i]) {
                    let valueText = data.valueTitle[i];
                    if (data.valueDesc && data.valueDesc[i]) {
                        valueText += `（${data.valueTitle[i]}（${data.valueDesc[i]}））`;
                    }
                    values.push(valueText);
                }
            }

            if (values.length > 0) {
                report += `- 核心價值 (GRI 2-23)：${values.join('、')}\n`;
            }
        }

        // 永續發展承諾
        if (data['sustainability-commitment']) {
            report += `- 永續發展承諾 (GRI 2-22)：${data['sustainability-commitment']}\n`;
        }

        // 【重大成就與認證】部分
        report += '\n【重大成就與認證 (GRI 2-28)】\n';

        // 數位醫療成就
        if (data.digitalAchievement && Array.isArray(data.digitalAchievement) && data.digitalAchievement.length > 0) {
            let achievements = [];
            for (let i = 0; i < data.digitalAchievement.length; i++) {
                if (data.digitalAchievement[i]) {
                    let achievement = data.digitalAchievement[i];
                    if (data.digitalAchievementYear && data.digitalAchievementYear[i]) {
                        achievement += `(${data.digitalAchievementYear[i]})`;
                    }
                    achievements.push(achievement);
                }
            }

            if (achievements.length > 0) {
                report += `- 數位醫療 (HC-DY-250)：${achievements.join('、')}\n`;
            }
        }

        // 醫療品質認證
        if (data.qualityCertification && Array.isArray(data.qualityCertification) && data.qualityCertification.length > 0) {
            let certifications = [];
            for (let i = 0; i < data.qualityCertification.length; i++) {
                if (data.qualityCertification[i]) {
                    let certification = data.qualityCertification[i];
                    if (data.certificationDetails && data.certificationDetails[i]) {
                        certification += ` ${data.certificationDetails[i]}`;
                    }
                    certifications.push(certification);
                }
            }

            if (certifications.length > 0) {
                report += `- 醫療品質：${certifications.join('、')}\n`;
            }
        }

        // 創新研發成果
        if (data.innovationResult && Array.isArray(data.innovationResult) && data.innovationResult.length > 0) {
            let innovations = [];
            for (let i = 0; i < data.innovationResult.length; i++) {
                if (data.innovationResult[i]) {
                    let innovation = data.innovationResult[i];
                    if (data.innovationDetails && data.innovationDetails[i]) {
                        innovation += ` ${data.innovationDetails[i]}`;
                    }
                    innovations.push(innovation);
                }
            }

            if (innovations.length > 0) {
                report += `- 創新研發：${innovations.join('、')}\n`;
            }
        }

        // 其他重要獎項與認證
        if (data.otherAward && Array.isArray(data.otherAward) && data.otherAward.length > 0) {
            let awards = [];
            for (let i = 0; i < data.otherAward.length; i++) {
                if (data.otherAward[i]) {
                    let award = data.otherAward[i];
                    if (data.awardYear && data.awardYear[i]) {
                        award += `(${data.awardYear[i]})`;
                    }
                    awards.push(award);
                }
            }

            if (awards.length > 0) {
                report += `- 其他獎項：${awards.join('、')}\n`;
            }
        }

        // 【組織架構】部分
        report += '\n【組織架構 (GRI 2-9)】\n';

        // 部門結構
        let departments = [];
        if (data.medicalDeptCount) departments.push(`醫療部門${data.medicalDeptCount}個`);
        if (data.technicalDeptCount) departments.push(`醫技部門${data.technicalDeptCount}個`);
        if (data.nursingDeptCount) departments.push(`護理部門${data.nursingDeptCount}個`);
        if (data.researchDeptCount) departments.push(`研究部門${data.researchDeptCount}個`);
        if (data.adminDeptCount) departments.push(`行政部門${data.adminDeptCount}個`);
        if (data.otherDeptCount) departments.push(`其他部門${data.otherDeptCount}個`);

        if (departments.length > 0) {
            report += `- 部門：${departments.join('、')}\n`;
        }

        // 委員會
        if (data.committeeCount) {
            report += `- 委員會 (GRI 2-9)：共${data.committeeCount}個委員會`;

            if (data.committeeCategory && Array.isArray(data.committeeCategory) && data.committeeCategory.length > 0) {
                let categories = [];
                for (let i = 0; i < data.committeeCategory.length; i++) {
                    if (data.committeeCategory[i]) {
                        let category = data.committeeCategory[i];
                        if (data.categoryCount && data.categoryCount[i]) {
                            category += ` ${data.categoryCount[i]}個`;
                        }
                        categories.push(category);
                    }
                }

                if (categories.length > 0) {
                    report += `，${categories.join('、')}`;
                }
            }

            report += '\n';
        }

        // 產學合作
        if (data.collaborationPartner && Array.isArray(data.collaborationPartner) && data.collaborationPartner.length > 0) {
            let partners = [];
            for (let i = 0; i < data.collaborationPartner.length; i++) {
                if (data.collaborationPartner[i]) {
                    let partner = data.collaborationPartner[i];
                    if (data.collaborationField && data.collaborationField[i]) {
                        partner += `（${data.collaborationField[i]}）`;
                    }
                    partners.push(partner);
                }
            }

            if (partners.length > 0) {
                report += `- 產學合作：與${partners.join('、')}等合作\n`;
            }
        }

        // 外部協會參與
        if (data.associationName && Array.isArray(data.associationName) && data.associationName.length > 0) {
            let associations = [];
            for (let i = 0; i < data.associationName.length; i++) {
                if (data.associationName[i]) {
                    let association = data.associationName[i];
                    if (data.associationRole && data.associationRole[i]) {
                        association += `（擔任${data.associationRole[i]}）`;
                    }
                    associations.push(association);
                }
            }

            if (associations.length > 0) {
                report += `- 外部協會參與 (GRI 2-28)：參與${associations.join('、')}等組織\n`;
            }
        }

        // 加上結尾提示
        report += '\n【註】本報告已符合GRI標準與SASB醫療照護服務行業標準HC-DY的關鍵指標要求，\n可由LLM基於此關鍵資料生成更完整的ESG報告內容。\n';

        // 添加附錄部分 - 引用的標準條文
        report += '\n【附錄】引用的報告標準條文\n\n';

        // GRI標準條文
        report += '# GRI標準條文\n\n';
        report += '## GRI 2：一般揭露 2021\n\n';

        report += '### GRI 2-1 組織詳細資訊\n';
        report += '組織應揭露：\n';
        report += 'a. 組織詳細資訊，包括：\n';
        report += '  i. 法定名稱\n';
        report += '  ii. 所有權和法律形式\n';
        report += '  iii. 總部所在地\n';
        report += '  iv. 營運活動所在地\n\n';

        report += '### GRI 2-3 報告期間、頻率與聯絡人\n';
        report += '組織應揭露：\n';
        report += 'a. 永續報告涵蓋的期間，包含開始日期和結束日期\n';
        report += 'b. 報告或資訊發布的頻率\n';
        report += 'c. 報告發布日期\n';
        report += 'd. 有關報告或其內容的聯絡人\n\n';

        report += '### GRI 2-5 外部保證/確信\n';
        report += '組織應揭露：\n';
        report += 'a. 其政策和實務對於尋求外部保證/確信的描述\n';
        report += 'b. 若永續報告已由外部保證/確信，應提供：\n';
        report += '  i. 連結至外部保證/確信報告、聲明或意見\n';
        report += '  ii. 與保證提供者的關係\n';
        report += '  iii. 最高治理單位和高階管理層是否參與尋求報告的外部保證/確信\n\n';

        report += '### GRI 2-7 員工\n';
        report += '組織應揭露：\n';
        report += 'a. 員工總數和按性別及地區劃分的員工數量\n';
        report += 'b. 按僱用類型和性別劃分的永久員工和臨時員工數量\n';
        report += 'c. 按僱用類型和性別劃分的全職和兼職的永久員工數量\n';
        report += 'd. 是否有顯著部分的組織活動由非員工工作者執行\n\n';

        report += '### GRI 2-9 治理結構與組成\n';
        report += '組織應揭露：\n';
        report += 'a. 其治理結構，包括最高治理單位下的委員會\n';
        report += 'b. 最高治理單位中負責決策的委員會，其考慮經濟、環境和社會議題的情況\n';
        report += 'c. 最高治理單位的組成\n\n';

        report += '### GRI 2-12 最高治理單位在監督衝擊管理方面的角色\n';
        report += '組織應揭露：\n';
        report += 'a. 最高治理單位在監督組織識別和管理對經濟、環境和社會的衝擊及相關風險與機會方面所扮演的角色\n';
        report += 'b. 最高治理單位在監督組織對於盡職調查流程有效性方面所扮演的角色\n';
        report += 'c. 最高治理單位在審查盡職調查流程的成效，以及管理對經濟、環境和社會衝擊方面所扮演的角色\n\n';

        report += '### GRI 2-22 永續發展策略的聲明\n';
        report += '組織應揭露：\n';
        report += 'a. 由最高決策者（例如CEO、董事長或相當高層職位）提出的永續發展策略，將永續發展與組織策略建立的關聯性，以及將永續發展納入其業務關係和價值鏈中的策略\n\n';

        report += '### GRI 2-23 政策承諾\n';
        report += '組織應揭露：\n';
        report += 'a. 負責任商業行為的政策承諾，包括：\n';
        report += '  i. 尊重人權\n';
        report += '  ii. 其他特定的政策承諾\n';
        report += 'b. 其負責任商業行為的政策承諾，是否：\n';
        report += '  i. 由最高治理單位批准\n';
        report += '  ii. 由資深管理層或技術專家提供參考意見\n';
        report += '  iii. 規定對人員、業務活動和業務關係的期望\n';
        report += '  iv. 可公開獲取\n';
        report += '  v. 透過內部和外部溝通\n';
        report += '  vi. 反映在政策和程序中\n\n';

        report += '### GRI 2-28 參與的協會\n';
        report += '組織應揭露：\n';
        report += 'a. 行業協會、其他會員協會和國家或國際性倡議組織中具有顯著參與的列表\n\n';

        // SASB標準條文
        report += '# SASB醫療照護服務標準 (HC-DY)\n\n';

        report += '## HC-DY-000 活動指標\n\n';

        report += '### HC-DY-000.A\n';
        report += '按服務類型的床位數量 (例如：急性、長期、康復、精神科等)\n\n';

        report += '### HC-DY-000.B\n';
        report += '按下列類型計算的入院人次：(1) 醫療保險 (2) 醫療救助 (3) 自付 (4) 商業保險 (5) 其他\n\n';

        report += '## HC-DY-250 病人隱私權與電子健康記錄\n\n';

        report += '### HC-DY-250.a.1\n';
        report += '因與病人隱私相關的資訊安全漏洞而導致的識別資訊被盜、丟失或外洩的次數\n\n';

        report += '### HC-DY-250.a.2\n';
        report += '因資訊安全漏洞而受影響的病人數量\n\n';

        report += '### HC-DY-250.a.3\n';
        report += '因違反HIPAA法規而產生的罰款和和解金額\n\n';

        report += '### HC-DY-250.a.4\n';
        report += '採用認證的電子健康記錄系統的百分比\n\n';

        return report;
    }

    // 生成報告
    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            if (validateCurrentPage()) {
                // 收集表單數據
                const formData = new FormData(document.getElementById('esgForm'));
                const reportData = {};

                // 處理標準複選框
                const standardsCheckboxes = document.querySelectorAll('input[name="standards"]:checked');
                if (standardsCheckboxes.length > 0) {
                    reportData.standards = Array.from(standardsCheckboxes).map(checkbox => checkbox.value);
                }

                // 將FormData轉換為對象
                for (let [key, value] of formData.entries()) {
                    // 跳過已處理的standards複選框
                    if (key === 'standards') continue;

                    // 處理陣列數據
                    if (key.endsWith('[]')) {
                        const baseKey = key.replace('[]', '');
                        if (!reportData[baseKey]) {
                            reportData[baseKey] = [];
                        }
                        reportData[baseKey].push(value);
                    } else {
                        reportData[key] = value;
                    }
                }

                // 生成關鍵資訊報告
                const report = generateKeyInfoReport(reportData);

                // 顯示報告
                document.getElementById('report-output').style.display = 'block';
                document.getElementById('report-content').textContent = report; // 使用textContent保留換行

                // 滾動到報告部分
                document.getElementById('report-output').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 編輯、下載和複製報告內容的功能
    const editReportBtn = document.getElementById('edit-report');
    const downloadReportBtn = document.getElementById('download-report');
    const copyReportBtn = document.getElementById('copy-report');

    if (editReportBtn) {
        editReportBtn.addEventListener('click', function () {
            // 隱藏報告，顯示表單
            document.getElementById('report-output').style.display = 'none';
            document.getElementById('esgForm').style.display = 'block';
        });
    }

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function () {
            const reportContent = document.getElementById('report-content').textContent;
            const hospitalName = document.getElementById('hospitalName').value || '醫院';
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${hospitalName}ESG報告關鍵資訊.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (copyReportBtn) {
        copyReportBtn.addEventListener('click', function () {
            const reportContent = document.getElementById('report-content').textContent;
            navigator.clipboard.writeText(reportContent).then(function () {
                alert('報告內容已複製到剪貼簿！');
            }).catch(function (err) {
                console.error('無法複製內容: ', err);
                alert('複製失敗，請手動選取內容進行複製。');
            });
        });
    }

    // 初始化頁面
    initFormPages();
});