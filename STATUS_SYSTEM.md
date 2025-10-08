# 📊 全站狀態管理系統

## 🎯 **狀態定義**

我們已經創建了一個完整的訂單狀態管理系統，涵蓋整個訂單生命週期：

### 📋 **狀態流程**

```
待上傳素材 → 素材已上傳 → 影片製作中 → 待確認 → 待排播 → 已播出
```

| 狀態              | 程式碼                 | 說明                         |
| ----------------- | ---------------------- | ---------------------------- |
| 🔄 **待上傳素材** | `pending_upload`       | 等待客戶上傳廣告素材         |
| 📁 **素材已上傳** | `material_uploaded`    | 素材已收到，準備進入製作流程 |
| 🎬 **影片製作中** | `video_production`     | 影片正在製作中，請稍候       |
| ⏳ **待確認**     | `pending_confirmation` | 等待客戶確認最終版本         |
| 📅 **待排播**     | `pending_schedule`     | 確認完成，等待排播時間       |
| ✅ **已播出**     | `broadcasted`          | 廣告已播出完成               |

## 🚀 **使用方式**

### 📦 **導入常數**

```typescript
import {
  ORDER_STATUSES,
  OrderStatusUtils,
  type OrderStatus,
} from '@/lib/constants'
```

### 🏷️ **獲取狀態標籤**

```typescript
const status = ORDER_STATUSES.PENDING_UPLOAD
const label = OrderStatusUtils.getLabel(status) // "待上傳素材"
```

### 🎨 **獲取狀態顏色**

```typescript
const colors = OrderStatusUtils.getColors(status)
// { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-400' }
```

### 📈 **狀態流程管理**

```typescript
// 獲取下一個狀態
const nextStatus = OrderStatusUtils.getNext(ORDER_STATUSES.PENDING_UPLOAD)
// 返回: ORDER_STATUSES.MATERIAL_UPLOADED

// 獲取狀態進度
const progress = OrderStatusUtils.getProgress(status)
// 返回: 17 (百分比)
```

### 🔧 **狀態 Hook**

```typescript
import { useOrderStatus } from '@/hooks/useOrderStatus'

function MyComponent() {
  const { currentStatus, moveToNext, canMoveNext } = useOrderStatus()

  return (
    <div>
      <p>當前狀態: {currentStatus}</p>
      <button onClick={moveToNext} disabled={!canMoveNext}>
        推進下一狀態
      </button>
    </div>
  )
}
```

## 🎨 **視覺展示**

### 🌈 **狀態顏色主題**

- 🟡 **待上傳素材**: 黃色系 (`yellow-50`/`yellow-800`)
- 🔵 **素材已上傳**: 藍色系 (`blue-50`/`blue-800`)
- 🟣 **影片製作中**: 紫色系 (`purple-50`/`purple-800`)
- 🟠 **待確認**: 橙色系 (`orange-50`/`orange-800`)
- 🔷 **待排播**: 靛色系 ({indigo-50`/`indigo-800`)
- 🟢 **已播出**: 綠色系 (`green-50`/`green-800`)

### 📊 **進度指示器**

```typescript
// 狀態流程進度
const progress = OrderStatusUtils.getProgress(status)
// 待上傳素材: 17%
// 素材已上傳: 33%
// 影片製作中: 50%
// 待確認: 67%
// 待排播: 83%
// 已播出: 100%
```

## 🔧 **已整合的功能**

### ✅ **List 頁面**

- 下拉選單已更新使用新的狀態系統
- 支援所有 6 個狀態的篩選
- 動態顯示當前選中的狀態標籤

### ✅ **Demo 頁面**

- 展示狀態流程視覺化
- 狀態顏色主題展示
- 進度條顯示

### ✅ **可重複使用組件**

- `StatusBadge`: 狀態標籤組件
- `StatusFlow`: 狀態流程展示
- `useOrderStatus`: 狀態管理 Hook

## 📱 **在應用中的應用**

### 🔍 **搜尋與篩選**

```typescript
const options = OrderStatusUtils.getAllOptions()
// [
//   { value: 'pending_upload', label: '待上傳素材' },
//   { value: 'material_uploaded', label: '素材已上傳' },
//   ...
// ]
```

### 📋 **訂單列表**

- 表格中顯示狀態標籤
- 附帶顏色指示
- 支援狀態篩選

### 🎯 **訂單詳細頁面**

- 狀態歷史追蹤
- 進度指示器
- 狀態變更日誌

## 🔄 **擴展性**

這個系統設計為高度可擴展：

- ✅ **類型安全**: TypeScript 完整支援
- ✅ **國際化**: 易於添加多語言標籤
- ✅ **狀態擴展**: 可輕鬆添加新狀態
- ✅ **主題自定義**: 色彩主題可調整
- ✅ **API 整合**: 狀態與後端同步

---

**🎉 現在您的應用已擁有完整的狀態管理系統！**
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
todo_write
