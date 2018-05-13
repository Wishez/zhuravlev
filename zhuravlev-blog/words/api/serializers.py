from rest_framework import serializers

from ..models import User

class PluginUserSerializer(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = (
            'uuid',
            'words',
            'current_site',
            'quantity_words',
            'username',
            'is_parsed_data',
            'was_gotten_new_domain',
            'allowed_quantity_words',
        )

class DocumentUserDataSerializer(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = (
            'uuid',
            'words',
            'user_domains',
        )