import QRCode from 'qrcode.react';
import { Modal} from "@iqueue/ui-kit";

function ProductQRCode ({open, onClose, value}) {
  return (
    <Modal title={`QR code of ${JSON.parse(value)?.model}`} isOpened={open} onClose={onClose}>
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <QRCode value={value} size={256} />
      </div>
    </Modal>
  )
}

export default ProductQRCode;