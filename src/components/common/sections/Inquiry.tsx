"use client";
import RadioGroup from "../../pages/home/components/RadioGroup";
import InputField from "../../pages/home/components/InputField";
import SelectField from "../../pages/home/components/SelectField";
import ImageUpload from "../../pages/home/components/ImageUpload";
import Image from "next/image";
import React from "react";
import { useFormHandler } from "@/hooks/useFormHandler";
import PrivacyPolicy from "@/components/pages/home/components/PrivacyPolicy";

const Inquiry = () => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    addProduct,
    deleteProduct,
    handleProductInputChange,
    agreePrivacy,
    setAgreePrivacy,
  } = useFormHandler();

  const numberOfProduct = 3;

  return (
    <section
      id="inquiry"
      className="py-[50px] lg:py-[60px] px-[20px] lg:px-0 bg-[url(/images/home-page/dot-bg-results.svg)] bg-auto font-noto"
    >
      <div>
        <h2 className="text-[30px] md:text-[40px] lg:text-[60px] leading-[45px] md:leading-[60px] lg:leading-[90px] font-black bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center">
          お問い合わせ
        </h2>
        <p className="mb-10 md:mb-12 lg:mb-14 mt-2 lg:mt-5 text-center text-xs lg:text-sm font-medium text-gray-700">
          <span className="text-red-600 pr-1 text-lg">*</span>
          営業目的での利用はお断りします
        </p>
      </div>
      <form
        className="space-y-6 max-w-[900px] md:mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Input Fields */}
        <InputField
          id="name"
          name="name"
          label="お名前"
          placeholder="未入力"
          value={formData.name}
          required
          onChange={handleInputChange}
        />
        <InputField
          id="email"
          name="email"
          label="メールアドレス"
          placeholder="未入力"
          value={formData.email}
          required
          onChange={handleInputChange}
        />
        <InputField
          id="phone"
          name="phone"
          label="電話番号"
          placeholder="半角ハイフンなし"
          value={formData.phone}
          required
          onChange={handleInputChange}
        />

        {/* Radio Groups */}
        <RadioGroup
          name="phonePermission"
          inlineLabels
          question="質問がある場合、こちらからお電話してもよろしいでしょうか？"
          required
          value={formData.phonePermission}
          onChange={handleInputChange}
          options={[
            { value: "allow_phone_call", label: "はい" },
            { value: "disallow_phone_call", label: "いいえ" },
          ]}
        />
        <RadioGroup
          name="usageType"
          question="使用状況"
          inlineLabels={false}
          required
          value={formData.usageType}
          options={[
            { value: "business", label: "事業（個人事業者または法人)" },
            { value: "personal", label: "個人で使用" },
          ]}
          onChange={handleInputChange}
        />
        <RadioGroup
          name="invoiceRegistration"
          inlineLabels
          required={false}
          question="事業で使用していた場合、インボイスの登録はしていますか？"
          value={formData.invoiceRegistration}
          onChange={handleInputChange}
          options={[
            { value: "registered", label: "はい" },
            { value: "not_registered", label: "いいえ" },
          ]}
        />
        <RadioGroup
          name="provideRegistrationNumber"
          inlineLabels
          required={false}
          question="買取が成立しましたら、登録番号をご提供いただけますでしょうか？"
          value={formData.provideRegistrationNumber}
          onChange={handleInputChange}
          options={[
            { value: "will_provide", label: "はい" },
            { value: "will_not_provide", label: "いいえ" },
          ]}
        />
        {/* Select Fields */}
        <SelectField
          id="city"
          name="city"
          label="都道府県"
          required
          value={formData.city}
          options={[
            { value: "not_selected", label: "選択してください" },
            { value: "hokkaido", label: "北海道" },
            { value: "aomori", label: "青森県" },
            { value: "iwate", label: "岩手県" },
            { value: "miyagi", label: "宮城県" },
            { value: "akita", label: "秋田県" },
            { value: "yamagata", label: "山形県" },
            { value: "fukushima", label: "福島県" },
            { value: "ibaraki", label: "茨城県" },
            { value: "tochigi", label: "栃木県" },
            { value: "gunma", label: "群馬県" },
            { value: "saitama", label: "埼玉県" },
            { value: "chiba", label: "千葉県" },
            { value: "tokyo", label: "東京都" },
            { value: "kanagawa", label: "神奈川県" },
            { value: "niigata", label: "新潟県" },
            { value: "toyama", label: "富山県" },
            { value: "ishikawa", label: "石川県" },
            { value: "fukui", label: "福井県" },
            { value: "yamanashi", label: "山梨県" },
            { value: "nagano", label: "長野県" },
            { value: "gifu", label: "岐阜県" },
            { value: "shizuoka", label: "静岡県" },
            { value: "aichi", label: "愛知県" },
            { value: "mie", label: "三重県" },
            { value: "shiga", label: "滋賀県" },
            { value: "kyoto", label: "京都府" },
            { value: "osaka", label: "大阪府" },
            { value: "hyogo", label: "兵庫県" },
            { value: "nara", label: "奈良県" },
            { value: "wakayama", label: "和歌山県" },
            { value: "tottori", label: "鳥取県" },
            { value: "shimane", label: "島根県" },
            { value: "okayama", label: "岡山県" },
            { value: "hiroshima", label: "広島県" },
            { value: "yamaguchi", label: "山口県" },
            { value: "tokushima", label: "徳島県" },
            { value: "kagawa", label: "香川県" },
            { value: "ehime", label: "愛媛県" },
            { value: "kochi", label: "高知県" },
            { value: "fukuoka", label: "福岡県" },
            { value: "saga", label: "佐賀県" },
            { value: "nagasaki", label: "長崎県" },
            { value: "kumamoto", label: "熊本県" },
            { value: "ooita", label: "大分県" },
            { value: "miyazaki", label: "宮崎県" },
            { value: "kagoshima", label: "鹿児島県" },
            { value: "okinawa", label: "沖縄県" },
          ]}
          onChange={handleInputChange}
        />
        <InputField
          id="productInfo"
          name="product_info"
          label="市区町村"
          placeholder="未入力"
          required={false}
          value={formData.product_info}
          onChange={handleInputChange}
        />
        {/* products list */}
        {formData.productsList.map((item, index) => (
          <div key={index} className="bg-[#fcf7f7] px-1 py-2 border">
            {index !== 0 && (
              <button
                type="button"
                onClick={() => deleteProduct(index)}
                className="w-[24px] h-[24px] ml-auto border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
                aria-label="Delete Product"
              >
                <Image
                  src="/images/icons/trash.svg"
                  alt="Delete"
                  width={11}
                  height={11}
                />
              </button>
            )}

            <InputField
              id={`productDetails-${index}`}
              name="product_details"
              label="査定希望商品のメーカー名、型番"
              placeholder="(例:リョービ電ノコ(ASK-1000)動作)"
              required
              value={item.product_details}
              onChange={(e) => handleProductInputChange(e, index)}
            />
            <SelectField
              id={`productCondition-${index}`}
              name="product_condition"
              label="状態を選択してください"
              required={true}
              value={item.product_condition}
              onChange={(e) => handleProductInputChange(e, index)}
              options={[
                { value: "not_selected", label: "選択してください" },
                { value: "unused", label: "未使用品" },
                { value: "excellent", label: "極上美品" },
                { value: "good", label: "美品" },
                { value: "used", label: "中古なり" },
                { value: "damaged", label: "キズ汚れ破損あり" },
                { value: "junk", label: "ジャンク" },
                { value: "scrap", label: "スクラップ" },
              ]}
            />
            {/* Image Upload */}
            <ImageUpload
              label="買取商品の写真があればこちらに添付してください。"
              setImages={handleImageChange}
              images={item.images ?? new Array(3).fill(null)}
              productIndex={index}
            />
          </div>
        ))}

        {/* add product btn */}
        {formData.productsList.length < numberOfProduct && (
          <button type="button" onClick={addProduct}>
            ＋商品追加
          </button>
        )}

        {/* Textarea */}
        <textarea
          id="additionalNotes"
          name="additional_notes"
          placeholder="ご質問やご連絡事項はこちらにお願いします"
          value={formData.additional_notes}
          className="py-[9px] px-[16px] w-full h-[100px] border-[1px] border-[#D1D5DB] rounded-md text-[14px] leading-[23px] font-normal"
          onChange={handleInputChange}
        />

        <PrivacyPolicy
          setAgreePrivacy={setAgreePrivacy}
          agreePrivacy={agreePrivacy}
        />

        <button
          disabled={isSubmitting || !agreePrivacy}
          type="submit"
          className={`w-[90%] lg:w-[60%] py-[12px] mx-auto text-[24px] leading-[36px] 
            text-center text-white font-black rounded flex items-start justify-center 
            gap-x-4 gradient-red ${
              isSubmitting || !agreePrivacy
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
        >
          {isSubmitting === true ? (
            "送信..."
          ) : (
            <>
              送信する
              <Image
                src="/images/icons/arrow-right-red.svg"
                alt="arrow-right-red"
                width={32}
                height={32}
              />
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default Inquiry;
